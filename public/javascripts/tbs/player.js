class Player {
    constructor(model, position, name)
    {
        this.model = model;
        this.position = position;
        this.name = name;
        this.speed = 3.0;
        this.party = new Party();
    }
    
    
    move(direction, tileSet)
    {
        var playerMoved = false;
        var x = this.position.x;
        var y = this.position.y;
        
        if(direction == "up" && tileSet.isTileInbounds(x, y + 1))
		{
            this.position.y += 1;
            playerMoved = true;
        }
        
        if(direction == "down" && tileSet.isTileInbounds(x, y - 1))
		{
            this.position.y += -1;
            playerMoved = true;
        }
        
        if(direction == "left" && tileSet.isTileInbounds(x - 1, y))
		{
            this.position.x += -1;
            playerMoved = true;
        }
        
        if(direction == "right" && tileSet.isTileInbounds(x + 1, y))
        {
            this.position.x += 1;
            playerMoved = true;
        }
                
        if(playerMoved)
        {
            this.setPosition(tileSet);
        }
    }

    setPosition(tileSet)
    {
        var tile = tileSet.tiles[this.position.x][this.position.y];

        this.model.position.set(tile.model.position.x, 
            tile.model.position.y,
            tile.model.position.z + 1)
    }

}

class Party{
    constructor()
    {
        this.members = [];
    }
    
    addMember(member)
    {
        this.members.push(member);
    }

    removeMember(member)
    {
        var index = this.members.indexOf(member.name);
        if (index > -1) {
            this.members.splice(index, 1);
        }
    }
}

class PartyMember {
    constructor(name, character)
    {
        this.name = name;
        this.character = character;
    }
}

class Character {
    constructor(name, _class, level)
    {
        this.name = name;
        this.class = _class;
        this.level = level;

        this.health = 5;
        this.armor = 0;

        this.strength = 5;
        this.dexterity = 5;
        this.intelligence = 5;
        this.wisdom = 5;

        this.skills = [];
        this.spells = [];
        this.equipment = [];
    }
}