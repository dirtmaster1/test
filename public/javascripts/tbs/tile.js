class Tile {
    constructor(model, is_accessible)
    {
        this.model = model;
        this.is_accessible = is_accessible;
        this.position = {"x" : 0, "y" : 0}
        this.g = Number.MAX_VALUE;
        this.h = Number.MAX_VALUE;
        this.f = this.g + this.h;
        this.parent = null;
    }
}