enum ImageFormat {
  Png = 'png',
  Jpeg = 'jpeg',
}

interface IResolution {
  width: number
  height: number
}

interface IImageConversation extends IResolution {
  format: ImageFormat
}

class ImageBuilder {
  // Фишка билдера чтобы он был чейнабл
  private formats: ImageFormat[] = []
  private resolutions: IResolution[] = []

  addPng() {
    if (this.formats.includes(ImageFormat.Png)) {
      return this
    }
    this.formats.push(ImageFormat.Png)
    return this // for example
  }

  addJpeg() {
    if (this.formats.includes(ImageFormat.Jpeg)) {
      return this
    }
    this.formats.push(ImageFormat.Jpeg)
    return this // for example
  }

  addResolution(width: number, height: number) {
    this.resolutions.push({ height, width })
    return this // for example
  }

  build(): IImageConversation[] {
    const res: IImageConversation[] = []
    for (const r of this.resolutions) {
      for (const f of this.formats) {
        res.push({
          format: f,
          height: r.height,
          width: r.width,
        })
      }
    }

    return res // for example
  }
}

console.log(new ImageBuilder()
.addJpeg()
.addPng()
.addResolution(100, 50)
.addResolution(50, 50)
.build()
)
