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

    isTileInbounds(x,y)
    {   
        if(x != null 
                && y != null 
                && x <= (this.max_columns-1) 
                && y <= (this.max_rows-1)
                && x >= 0
                && y >= 0)
            {
                if(this.tiles[x][y].is_accessible)
                    return true;
            }

        return false;
    }
}