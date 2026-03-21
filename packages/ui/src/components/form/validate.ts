import type { Rule } from './types'

/**
 * Validate a single value against a single rule.
 * Returns an error message string if validation fails, or null if valid.
 */
export async function validateRule(rule: Rule, value: any): Promise<string | null> {
  // Apply transform if specified
  let val = value
  if (rule.transform) {
    val = rule.transform(val)
  }

  // Required check
  if (rule.required) {
    if (val === undefined || val === null || val === '') {
      return rule.message || 'This field is required'
    }
    if (Array.isArray(val) && val.length === 0) {
      return rule.message || 'This field is required'
    }
  }

  // Skip further checks if value is empty and not required
  if (val === undefined || val === null || val === '') {
    return null
  }

  // Whitespace check (for strings)
  if (rule.whitespace && typeof val === 'string' && val.trim() === '') {
    return rule.message || 'This field cannot be empty whitespace'
  }

  // Type check
  if (rule.type) {
    const typeError = checkType(rule.type, val)
    if (typeError) {
      return rule.message || typeError
    }
  }

  // Enum check
  if (rule.enum && Array.isArray(rule.enum)) {
    if (!rule.enum.includes(val)) {
      return rule.message || `Must be one of: ${rule.enum.join(', ')}`
    }
  }

  // Length checks for strings and arrays
  if (typeof val === 'string' || Array.isArray(val)) {
    if (rule.len !== undefined && val.length !== rule.len) {
      return rule.message || `Must be exactly ${rule.len} characters`
    }
    if (rule.min !== undefined && val.length < rule.min) {
      return rule.message || `Must be at least ${rule.min} characters`
    }
    if (rule.max !== undefined && val.length > rule.max) {
      return rule.message || `Must be at most ${rule.max} characters`
    }
  }

  // Value checks for numbers
  if (typeof val === 'number') {
    if (rule.len !== undefined && val !== rule.len) {
      return rule.message || `Must equal ${rule.len}`
    }
    if (rule.min !== undefined && val < rule.min) {
      return rule.message || `Must be at least ${rule.min}`
    }
    if (rule.max !== undefined && val > rule.max) {
      return rule.message || `Must be at most ${rule.max}`
    }
  }

  // Pattern check
  if (rule.pattern instanceof RegExp) {
    if (!rule.pattern.test(String(val))) {
      return rule.message || 'Does not match the required pattern'
    }
  }

  // Custom async validator
  if (rule.validator) {
    try {
      await rule.validator(rule, val)
    } catch (err: any) {
      if (typeof err === 'string') {
        return err
      }
      return err?.message || rule.message || 'Validation failed'
    }
  }

  return null
}

/**
 * Validate a value against multiple rules.
 * Returns collected errors and warnings.
 */
export async function validateRules(
  rules: Rule[],
  value: any,
): Promise<{ errors: string[]; warnings: string[] }> {
  const errors: string[] = []
  const warnings: string[] = []

  for (const rule of rules) {
    const message = await validateRule(rule, value)
    if (message) {
      if (rule.warningOnly) {
        warnings.push(message)
      } else {
        errors.push(message)
      }
    }
  }

  return { errors, warnings }
}

// ── Type checking helpers ──

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i
const HEX_RE = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

function checkType(type: string, value: any): string | null {
  switch (type) {
    case 'string':
      if (typeof value !== 'string') return `Is not a valid string`
      break
    case 'number':
      if (typeof value !== 'number' || Number.isNaN(value)) return `Is not a valid number`
      break
    case 'boolean':
      if (typeof value !== 'boolean') return `Is not a valid boolean`
      break
    case 'integer':
      if (typeof value !== 'number' || !Number.isInteger(value)) return `Is not a valid integer`
      break
    case 'float':
      if (typeof value !== 'number' || Number.isNaN(value)) return `Is not a valid number`
      break
    case 'array':
      if (!Array.isArray(value)) return `Is not a valid array`
      break
    case 'object':
      if (typeof value !== 'object' || value === null || Array.isArray(value))
        return `Is not a valid object`
      break
    case 'date':
      if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
        // Also try parsing string dates
        if (typeof value === 'string' || typeof value === 'number') {
          const d = new Date(value)
          if (Number.isNaN(d.getTime())) return `Is not a valid date`
        } else {
          return `Is not a valid date`
        }
      }
      break
    case 'url':
      if (typeof value !== 'string' || !URL_RE.test(value)) return `Is not a valid URL`
      break
    case 'email':
      if (typeof value !== 'string' || !EMAIL_RE.test(value)) return `Is not a valid email`
      break
    case 'hex':
      if (typeof value !== 'string' || !HEX_RE.test(value)) return `Is not a valid hex value`
      break
    case 'regexp':
      try {
        if (value instanceof RegExp) break
        if (typeof value === 'string') {
          new RegExp(value)
          break
        }
        return `Is not a valid regexp`
      } catch {
        return `Is not a valid regexp`
      }
    case 'enum':
      // enum type check is handled by enum array rule, skip here
      break
    case 'any':
      break
  }
  return null
}
