
export default interface IPokemon {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    types: ITypes[],
    abilities: IAbilities[],
    sprites: ISprites
};

interface ITypes {
    type: IType
};

type IType = {
    name: string
};


interface IAbilities {
    ability: IAbility
};

interface IAbility {
    name: string
};

interface ISprites {
    front_default: string
};

