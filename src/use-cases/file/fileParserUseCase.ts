import type { FileInputLineDTO } from '@dtos/fileInputDto';

export class FileParserUseCase {
  private readonly FIELD_LENGTHS = {
    userId: 10,
    userName: 45,
    orderId: 10,
    productId: 10,
    value: 12,
    date: 8,
  };

  parseFile(content: string): FileInputLineDTO[] {
    return content
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => this.parseLine(line));
  }

  private parseLine(line: string): FileInputLineDTO {
    let position = 0;

    return {
      userId: parseInt(
        line.slice(position, (position += this.FIELD_LENGTHS.userId)),
      ),
      userName: line
        .slice(position, (position += this.FIELD_LENGTHS.userName))
        .trim(),
      orderId: parseInt(
        line.slice(position, (position += this.FIELD_LENGTHS.orderId)),
      ),
      productId: parseInt(
        line.slice(position, (position += this.FIELD_LENGTHS.productId)),
      ),
      value: Math.floor(
        parseFloat(
          line.slice(position, (position += this.FIELD_LENGTHS.value)),
        ) * 100,
      ), // Convert to bigint with 2 decimal places
      date: this.parseDate(
        line.slice(position, (position += this.FIELD_LENGTHS.date)),
      ),
    };
  }

  private parseDate(dateStr: string): Date {
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1;
    const day = parseInt(dateStr.slice(6, 8));
    return new Date(year, month, day);
  }
}
