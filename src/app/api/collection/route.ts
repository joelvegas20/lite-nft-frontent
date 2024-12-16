

export async function GET(request: Request) {

    const collections = [
        {
            id: 1,
            name: "Bitcoin Birds",
            subtitle: "Unique Bitcoin Birds avatars",
            price: "1200",
            ownerTitle: "SP33M...4RK",
            ownerSubtitle: "not bns",
            quantity: 500,
            ownerPicture: "https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-88.png",
            image:"https://images.gamma.io/cdn-cgi/image/quality=100,width=300,height=300/https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-0.png"
        },
        {
            id: 2,
            name: "Galactic Space Cats",
            subtitle: "The meow-tastic intergalactic cats",
            price: "900",
            ownerTitle: "SP12N...R3K",
            ownerSubtitle: "not bns",
            quantity: 300,
            ownerPicture: "https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-88.png",
            image:"https://images.gamma.io/cdn-cgi/image/quality=100,width=300,height=300/https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-0.png"
        },
        {
            id: 3,
            name: "Mystic Lands",
            subtitle: "Explore the magic realms",
            price: "1500",
            ownerTitle: "SP23P...Q2T",
            ownerSubtitle: "not bns",
            quantity: 800,
            ownerPicture: "https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-88.png",
            image:"https://images.gamma.io/cdn-cgi/image/quality=100,width=300,height=300/https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-0.png"
        },
        {
            id: 4,
            name: "Samurai Punks",
            subtitle: "Blades and neon lights",
            price: "2200",
            ownerTitle: "SP89F...K7Z",
            ownerSubtitle: "not bns",
            quantity: 250,
            ownerPicture: "https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-88.png",
            image:"https://images.gamma.io/cdn-cgi/image/quality=100,width=300,height=300/https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-0.png"
        },
        {
            id: 5,
            name: "Dragon's Realm",
            subtitle: "Unleash the fire",
            price: "4000",
            ownerTitle: "SP99C...9YT",
            ownerSubtitle: "not bns",
            quantity: 1000,
            ownerPicture: "https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-88.png",
            image:"https://images.gamma.io/cdn-cgi/image/quality=100,width=300,height=300/https://images.gamma.io/ipfs/QmNcUCdjFK39Pk5iRrKY7Ez6hmqBcdnuxDZDAjTmeoxUqZ/bird-0.png"
        },
    ];
    return Response.json(collections)
  }