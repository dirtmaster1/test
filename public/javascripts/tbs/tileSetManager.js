class TileSetManager {

    constructor(tileSet, player)
    {
        this.tileSet = tileSet,
        this.player = player,
        this.selectedTile = null,
        this.openTileColor = 0x00ff00; //green
        this.closedTileColor = 0xff0000; //red
        this.selectedTileColor = 0xffffff; //grey
        this.controls = tbs.controls;
        this.click_mouse_x = null;
        this.click_mouse_y = null;
        this.click_tile_x = null;
        this.click_tile_y = null; 
    }

    update()
	{
        this.setPlayerClickValues();
        
        var playerMoveDirection = this.controls.getPlayerMoveDirection();
        
        if(playerMoveDirection)
        {
            this.movePlayer(playerMoveDirection);
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

    movePlayer(direction)
    {
        var playerMoved = false;
        var x = this.player.position.x;
        var y = this.player.position.y;
        
        if(direction == "up" && this.isTileInbounds(x, y + 1))
		{
            this.player.position.y += 1;
            playerMoved = true;
        }
        
        if(direction == "down" && this.isTileInbounds(x, y - 1))
		{
            this.player.position.y += -1;
            playerMoved = true;
        }
        
        if(direction == "left" && this.isTileInbounds(x - 1, y))
		{
            this.player.position.x += -1;
            playerMoved = true;
        }
        
        if(direction == "right" && this.isTileInbounds(x + 1, y))
        {
            this.player.position.x += 1;
            playerMoved = true;
        }
                
        if(playerMoved)
        {
            this.setPlayerPositionAndTileState();
        }
    }

    setPlayerClickValues()
    {
        var tileSet = this.tileSet;
        var click = this.controls.getPlayerClickPosition();
        
        if(click.x != null && click.y != null)
        {
            this.click_mouse_x = click.x;
            this.click_mouse_y = click.y;

            this.click_tile_x = this.getClickedTile(this.click_mouse_x, tileSet.tileWidth, tileSet.max_columns);
            this.click_tile_y = this.getClickedTile(this.click_mouse_y, tileSet.tileHeight, tileSet.max_rows);

            this.selectTile(this.click_tile_x, this.click_tile_y);
            
            // add astar here
            this.moveAStar();    
        }
    }

    moveAStar()
    {
        var end = { x : this.click_tile_x , y : this.click_tile_y};
        var start = { x : this.player.position.x , y : this.player.position.y};
        
        if(end.x != null && end.y != null)
        {
            var graph = this.creatGraphFromTileSet();
            graph.print();
            this.aStar(start, end, graph);
        }
    }

    //start a star code to move to algorithm.js
    aStar(start, end, graph)
    {
        var closedSet = {};
        var openSet = {start};
        var cameFrom = {};
        
        var gScore = this.initializeGScores();
        gScore[start] = 0;

        var fScore = {};
        fScore[start]
    }

    initializeGScores()
    {
        return {};
    }

    creatGraphFromTileSet()
    {
        var rows = this.tileSet.max_rows;
        var cols = this.tileSet.max_columns;
        var numberOfVertices = rows * cols;
        
        var graph = new Graph(numberOfVertices);

        // adding vertices
        for(var x = 0; x < cols; x++)
		{
			for(var y = 0; y < rows; y++)
			{   
                if(this.isTileInbounds(x, y))
                {
                    var tile = this.tileSet.tiles[x][y];
                    graph.addVertex(tile);
                
                    // add neighbors
                    if(this.isTileInbounds(x + 1, y))
                    {
                        graph.addEdge(tile, this.tileSet.tiles[x + 1][y]);
                    }
                    
                    if(this.isTileInbounds(x - 1, y))
                    {
                        graph.addEdge(tile, this.tileSet.tiles[x - 1][y]);
                    }

                    if(this.isTileInbounds(x, y + 1))
                    {
                        graph.addEdge(tile, this.tileSet.tiles[x][y + 1]);
                    }

                    if(this.isTileInbounds(x, y - 1))
                    {
                        graph.addEdge(tile, this.tileSet.tiles[x][y - 1]);
                    }
                }
            }
        }

        return graph;
    }

    //end a star code to move to algorithm.js

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

    setPlayerPositionAndTileState()
    {
        var tile = this.tileSet.tiles[this.player.position.x][this.player.position.y];

        this.player.model.position.set(tile.model.position.x, 
            tile.model.position.y,
            tile.model.position.z + 1)
    }

    selectTile(x,y)
    {
        if(this.isTileInbounds(x,y))
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

    isTileInbounds(x,y)
    {   
        if(x != null 
            && y != null 
            && x <= (this.tileSet.max_columns-1) 
            && y <= (this.tileSet.max_rows-1)
            && x >= 0
            && y >= 0)
        {
            if(this.tileSet.tiles[x][y].is_accessible)
                return true;
        }

        return false;
    }
}