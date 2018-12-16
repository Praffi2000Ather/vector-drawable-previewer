interface Element {
    isComment(): boolean
    isVector(): boolean
    setAttr(name: string, other: Attr | null): void
    getAttr(name: string): Attr | null
    setAttrValue(name: string, value: any): void
    getAttrValue(name: string): string | null
    hasClass(name: string): boolean
    parentElementOf(nth: number): Element | null
}

Element.prototype.isComment = function(): boolean {
    return this.nodeName === "comment"
}

Element.prototype.isVector = function(): boolean {
    return this.nodeName === "vector"
}

Element.prototype.setAttr = function(name: string, other: Attr | null): void {
    if (other) {
        this.setAttrValue(name, other.value)
    }
}

Element.prototype.setAttrValue = function(name: string, value: any): void {
    if (value) {
        if (typeof (this as any).setAttributeNS === "function") {
            (this as any).setAttributeNS(null, name, value)
        } else {
            (this.attributes as any)[name] = value
        }
    }
}

Element.prototype.getAttr = function(name: string): Attr | null {
    return (this.attributes as any)[name]
}

Element.prototype.getAttrValue = function(name: string): string | null {
    const attr = this.getAttr(name)

    if (!attr) {
        return null
    }

    return attr.value
}

Element.prototype.hasClass = function(name: string): boolean {
    return new RegExp("(\\s|^)" + name + "(\\s|$)").test(this.className)
}

Element.prototype.parentElementOf = function(nth: number): Element | null {
    let element: Element | null = this

    for (let i = 0; i < nth; i++) {
        element = element && element.parentElement
    }

    return element
}

interface NodeList {
    findVectorDrawbleElement(): Element | null
}

NodeList.prototype.findVectorDrawbleElement = function(): Element | null {
    for (const node of this) {
        if (node instanceof Element && node.isVector()) {
            return node
        }
    }

    return null
}
