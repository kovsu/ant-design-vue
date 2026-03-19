<template>
  <div style="max-width: 400px">
    <strong>Single-line ellipsis:</strong>
    <a-typography-paragraph :ellipsis="true">
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
    </a-typography-paragraph>

    <strong>Multi-line (3 rows) ellipsis:</strong>
    <a-typography-paragraph :ellipsis="{ rows: 3 }">
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
    </a-typography-paragraph>

    <strong>Expandable:</strong>
    <a-typography-paragraph :ellipsis="{ rows: 2, expandable: true }">
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
    </a-typography-paragraph>
  </div>
</template>
