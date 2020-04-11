class TileSetManager {

    constructor(factory, scene)
    {
        this.algorithm = new Algorithm();
        this.factory = factory;
        
        this.tileSet = this.factory.createTileSet(20, 20, scene);
		this.player = this.factory.createPlayer("player", scene, 0, 0);
		
        this.selectedTile = null,
        this.openTileColor = 0x00ff00; //green
        this.closedTileColor = 0xff0000; //red
        this.selectedTileColor = 0xffffff; //grey
        this.pathTileColor = 0x0000ff; //blue
        this.controls = tbs.controls;
        this.click_mouse_x = null;
        this.click_mouse_y = null;
        this.click_tile_x = null;
        this.click_tile_y = null; 
        this.path = null;
        this.elapsedTime = 0.0;
        this.pathCounter = 0;
        this.pathChanged = false;
    }

    update(delta)
	{
        this.elapsedTime += delta;
        
        this.setPlayerClickValues();
        
        var playerMoveDirection = this.controls.getPlayerMoveDirection();
        
        if(playerMoveDirection)
        {
            this.player.move(playerMoveDirection, this.tileSet);
        }

        this.updatePath();
    }

    updatePath()
    {
        if(this.path)
        {
           if(this.pathChanged)
           {
               this.pathCounter = 0;
               this.pathChanged = false;
           }
           
            if(this.elapsedTime * this.player.speed > 1)
           {
                const tile = this.path[this.pathCounter];
                
                this.player.position.x = tile.position.x;
                this.player.position.y = tile.position.y;

                this.player.setPosition(this.tileSet);

                this.pathCounter++;
                this.elapsedTime = 0;
                
                if(this.pathCounter >= this.path.length)
                {
                    this.path = null;
                    this.pathCounter = 0;
                }
           }

        }
    }

    getGameState()
    {
        return { player : this.player,
            click_mouse_x : this.click_mouse_x,
            click_mouse_y : this.click_mouse_y,
            click_tile_x : this.click_tile_x,
            click_tile_y : this.click_tile_y
        };
    }

    setPlayerClickValues()
    {
        var tileSet = this.tileSet;
        var click = this.controls.getPlayerClickPosition();
        
        if(click.x != null && click.y != null 
            && (click.x != this.click_mouse_x || click.y != this.click_mouse_y))
        {
            this.click_mouse_x = click.x;
            this.click_mouse_y = click.y;

            this.click_tile_x = this.getClickedTile(this.click_mouse_x, tileSet.tileWidth, tileSet.max_columns);
            this.click_tile_y = this.getClickedTile(this.click_mouse_y, tileSet.tileHeight, tileSet.max_rows);

            this.selectTile(this.click_tile_x, this.click_tile_y);
            
            this.path = this.calculatePath();
            this.pathChanged = true;
        }
    }

    calculatePath()
    {
        if(this.tileSet.isTileInbounds(this.click_tile_x, this.click_tile_y))
        {
            var endTile = this.tileSet.tiles[this.click_tile_x][this.click_tile_y];
            var startTile = this.tileSet.tiles[this.player.position.x][this.player.position.y];
            
            if(endTile.position.x != null && endTile.position.y != null)
            {
                this.resetTileSet();

                var path = this.algorithm.aStarSearch(startTile, endTile);

                return path;
            }
        }
    }

    resetTileSet()
    {
        var rows = this.tileSet.max_rows;
        var cols = this.tileSet.max_columns;

        for(var x = 0; x < cols; x++)
		{
			for(var y = 0; y < rows; y++)
			{
                var tile = this.tileSet.tiles[x][y];
                tile.reset();
            }
        }
    }

    getClickedTile(mouse, length, maxCount)
    {
        // todo not sure why threejs tile width 2x that of client tile width, need to figure that out 
        var tileNumber = (mouse - (mouse % (length/2)))/(length/2);
        
        if(tileNumber > (maxCount-1) || tileNumber < 0)
        {
            return null
        }

        return tileNumber;
    }

    selectTile(x,y)
    {
        if(this.tileSet.isTileInbounds(x, y))
        {
            
            if(this.selectedTile == null)
            {
                this.selectedTile = this.tileSet.tiles[x][y];
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
                    
                    this.selectedTile = this.tileSet.tiles[x][y];
                    this.selectedTile.model.children[0].material.color.set( this.selectedTileColor );
                }
            }
        }
    }
}