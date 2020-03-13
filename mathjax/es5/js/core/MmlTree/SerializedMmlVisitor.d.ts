import { MmlVisitor } from './MmlVisitor.js';
import { MmlNode, TextNode, XMLNode } from './MmlNode.js';
export declare const DATAMJX = "data-mjx-";
declare type PropertyList = {
    [name: string]: string;
};
export declare class SerializedMmlVisitor extends MmlVisitor {
    static variants: PropertyList;
    static defaultAttributes: {
        [kind: string]: PropertyList;
    };
    visitTree(node: MmlNode): any;
    visitTextNode(node: TextNode, space: string): string;
    visitXMLNode(node: XMLNode, space: string): string;
    visitInferredMrowNode(node: MmlNode, space: string): string;
    visitTeXAtomNode(node: MmlNode, space: string): string;
    visitAnnotationNode(node: MmlNode, space: string): string;
    visitDefault(node: MmlNode, space: string): string;
    protected childNodeMml(node: MmlNode, space: string, nl: string): string;
    protected getAttributes(node: MmlNode): string;
    protected getDataAttributes(node: MmlNode): {};
    protected setDataAttribute(data: PropertyList, name: string, value: string): void;
    protected quoteHTML(value: string): string;
}
export {};
