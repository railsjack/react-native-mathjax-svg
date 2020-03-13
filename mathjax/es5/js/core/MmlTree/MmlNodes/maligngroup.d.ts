import { PropertyList } from '../../Tree/Node.js';
import { AbstractMmlLayoutNode, AttributeList } from '../MmlNode.js';
export declare class MmlMaligngroup extends AbstractMmlLayoutNode {
    static defaults: PropertyList;
    readonly kind: string;
    readonly isSpacelike: boolean;
    protected setChildInheritedAttributes(attributes: AttributeList, display: boolean, level: number, prime: boolean): void;
}
