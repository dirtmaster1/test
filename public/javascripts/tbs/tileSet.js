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

    selectTile(x,y)
    {
        if(this.isTileInbounds(x,y))
        {
            
            if(this.selectedTile == null)
            {
                this.selectedTile = this.tiles[y][x];
                this.selectedTile.model.children[0].material.color.set( this.selectedTileColor );
            }
            else
            {
                if(this.selectedTile.position.x != x || this.selectedTile.position.y != y)
                {
                    if(this.selectedTile.is_accessible)
                    {
                        this.selectedTile.model.children[0].material.color.set( this.openTileColor );
                    } 
                    else   
                    {
                        this.selectedTile.model.children[0].material.color.set( this.closedTileColor );
                    }
                    
                    this.selectedTile = this.tiles[y][x];
                    this.selectedTile.model.children[0].material.color.set( this.selectedTileColor );
                }
            }
        }
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
            return true;
        }

        return false;
    }
}