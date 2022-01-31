export enum Size {
  '58MM' = 58,
  '80MM' = 80
}
type Configs = {
  size: Size
}

type Columns<T> = {
  [P in keyof T]: {
    name: string
    maxCaracteres?: number | ((size: Size) => number)
    alignment?: AlignmentType
  }
}
type AlignmentType = 'center' | 'right' | 'left'
type ConfigsTable = {
  hideHeader?: boolean
  headerDecorator?: string
}
export const characteres = {
  [Size['58MM']]: 32,
  [Size['80MM']]: 48
}

class Ticket {
  private text = ''
  private configs: Configs = { size: Size['58MM'] }
  constructor(configs: Configs) {
    this.configs = configs
  }

  private getAlignmentText(
    text: string,
    maxLenght: number,
    alignment: AlignmentType,
    multiline = true
  ) {
    let texts: string[] = [text]
    if (text.length > maxLenght) {
      if (!multiline) {
        return text.substring(0, maxLenght)
      }
      const splitText = text.split(' ')
      texts = ['']
      splitText.forEach((txt) => {
        if (!txt) return
        const currText = texts[texts.length - 1] + txt + ' '
        if (currText.length > maxLenght) {
          texts.push(txt + ' ')
        } else {
          texts[texts.length - 1] = currText
        }
      })
    }
    const newText = {
      center: texts
        .map((text) =>
          text.padStart((maxLenght - text.length) / 2 + text.length).padEnd(maxLenght)
        )
        .join('\n'),
      right: texts.map((text) => text.padStart(maxLenght)).join('\n'),
      left: texts.map((text) => text.padEnd(maxLenght)).join('\n')
    }
    return newText[alignment] || ''
  }

  addText(text: string, alignment: AlignmentType = 'left') {
    const maxLenth = characteres[this.configs.size]
    this.text += this.getAlignmentText(text, maxLenth, alignment) + '\n'
    return this
  }

  addDecorator(decorator: string) {
    this.text += ''.padStart(characteres[this.configs.size], decorator) + `${'\n'}`
    return this
  }

  addTable<T>(table: Table<T>) {
    const data = table.getData()
    const columns = table.getColums()
    const configs = table.getConfigs()
    data.forEach((item, index) => {
      const showHeader = index === 0 && !configs?.hideHeader
      let row = ''
      let txtColums = ''

      Object.entries<any>(columns).forEach(([key, value]) => {
        const maxLenght =
          typeof value.maxCaracteres === 'function'
            ? value.maxCaracteres(this.configs.size)
            : value.maxCaracteres
        const alignment = value.alignment || 'left'
        const txt = `${item[key as keyof typeof item]}`
        const colum = this.getAlignmentText(txt, maxLenght, alignment, false)
        row += colum

        if (showHeader) {
          txtColums += this.getAlignmentText(value.name, maxLenght, alignment, false)
        }
      })
      if (showHeader) {
        this.addDecorator(configs?.headerDecorator || '=')
        this.addText(txtColums)
        this.addDecorator(configs?.headerDecorator || '=')
      }
      this.addText(row)
      item.decorator && this.addDecorator(item.decorator)
    })
    return this
  }

  getText() {
    return this.text
  }
}

type Options = { decorator?: string }
export class Table<T> {
  private colums: Columns<T>
  private data?: ({ [P in keyof T]: string | number } & Options)[] = []
  private configs?: ConfigsTable

  constructor(
    columns: Columns<T>,
    data?: ({ [P in keyof T]: string | number } & Options)[]
  ) {
    this.colums = columns
    data && (this.data = data)
  }

  addRowWithValues(decorator: string | null, ...values: (string | number)[]) {
    const item: any = {}
    Object.keys(this.colums).forEach((key, index) => {
      if (values[index]) {
        item[key] = values[index]
      }
    })
    if (decorator) {
      item.decorator = decorator
    }
    this.data!.push(item)
  }

  getColums() {
    return this.colums
  }

  getData() {
    return this.data!
  }
  getConfigs() {
    return this.configs
  }
  setConfigs(configs: ConfigsTable) {
    this.configs = configs
  }

  // builder(this: Table<T>, handler: Function) {
  //   handler()
  // }
}
export default Ticket
