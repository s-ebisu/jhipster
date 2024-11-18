export const markdownDetails = ({
  title,
  content,
  contentWrapper = 'pre',
}: {
  title: string;
  content: string;
  contentWrapper?: string | null;
}): string => {
  const details = contentWrapper === null ? content : `\n  <${contentWrapper}>\n${content}\n  </${contentWrapper}>`;
  return `<details>\n  <summary>${title}</summary>${details}\n</details>`;
};
