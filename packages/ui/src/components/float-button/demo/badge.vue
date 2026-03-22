<template>
  <div style="height: 300px; position: relative; overflow: hidden;">
    <!-- Single button with dot badge -->
    <a-float-button
      :badge="{ dot: true }"
      style="position: absolute; right: 140px; bottom: 24px;"
    >
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm-16 152h128v272H448V488z" />
      </svg>
    </a-float-button>

    <!-- Button with count badge -->
    <a-float-button
      :badge="{ count: 5 }"
      style="position: absolute; right: 70px; bottom: 24px;"
    >
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm-16 152h128v272H448V488z" />
      </svg>
    </a-float-button>

    <!-- Button with large count badge -->
    <a-float-button
      :badge="{ count: 123 }"
      style="position: absolute; right: 0; bottom: 24px;"
    >
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm-16 152h128v272H448V488z" />
      </svg>
    </a-float-button>
  </div>
</template>
