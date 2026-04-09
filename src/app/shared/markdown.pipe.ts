import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string | string[] | null | undefined): string {
    if (!value) {
      return '';
    }

    const markdown = Array.isArray(value) ? value.join('\n\n') : value;

    return marked.parse(markdown, { async: false }) as string;
  }
}
