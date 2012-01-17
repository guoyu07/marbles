function init() {
  var b2Vec2 = Box2D.Common.Math.b2Vec2,
  b2AABB = Box2D.Collision.b2AABB,
  b2BodyDef = Box2D.Dynamics.b2BodyDef,
  b2Body = Box2D.Dynamics.b2Body,
  b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
  b2Fixture = Box2D.Dynamics.b2Fixture,
  b2MassData = Box2D.Collision.Shapes.b2MassData,
  b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
  b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
  b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

  var bodyDef = new b2BodyDef;

  // load world and level
  var world = new World();
  new LevelA();
  var comms = new Comms();

  // create marble

  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;

  var marble = null;
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2CircleShape(1);
  bodyDef.position.x = Math.random() * 10;
  bodyDef.position.y = Math.random() * 10;
  marble = world.CreateBody(bodyDef)
  marble.CreateFixture(fixDef);

  // marble.ApplyImpulse(new b2Vec2(1,
  //                                1),
  //                                marble.GetWorldCenter());

  // setup debug draw
  var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(30.0);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

  window.setInterval(update, 1000 / 60);

  function update() {
    world.Step(1 / 60, 10, 10);
    world.DrawDebugData();
    world.ClearForces();
  };

  // helpers

  //http://js-tut.aardon.de/js-tut/tutorial/position.html
  function getElementPosition(element) {
    var elem=element, tagname="", x=0, y=0;

    while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
      y += elem.offsetTop;
      x += elem.offsetLeft;
      tagname = elem.tagName.toUpperCase();

      if(tagname == "BODY")
        elem=0;

      if(typeof(elem) == "object") {
        if(typeof(elem.offsetParent) == "object")
          elem = elem.offsetParent;
      }
    }

    return {x: x, y: y};
  }
};