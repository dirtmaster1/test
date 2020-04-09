class Tile {
    constructor(model, is_accessible)
    {
        this.model = model;
        this.is_accessible = is_accessible;
        this.position = {"x" : 0, "y" : 0}
        this.g = 0;
        this.h = 0;
        this.f = this.g + this.h;
        this.parent = null;
        this.neighbors = [];
    }

    reset()
    {
        this.g = 0;
        this.h = 0;
        this.parent = null;
    }
}