class TileSet {
    
    constructor(maxRows, maxColumns, tileWidth, tileHeight)
    {
        this.tiles = new Array(maxRows),
        this.max_rows = maxColumns,
		this.max_columns = maxRows,
		this.tileWidth = tileWidth,
        this.tileHeight = tileHeight
        this.selectedTile = null,
        this.openTileColor = 0x00ff00; //green
        this.closedTileColor = 0xff0000; //red
        this.selectedTileColor = 0xffffff; //grey
    }
}