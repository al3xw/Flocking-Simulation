class FoodBoid extends Boid {

  constructor(x, y) {
    super(x, y);
    this.accelertion = createVector(-100,100);
    this.velocity = createVector(random(-20,20), random(-20,20));
    this.radius = 4.0;
    this.maxSpeed = 4.5;
    this.maxForce = 0.1;
    this.color = color('#FFFF00');
    
    //flocking-system
    this.separationDist = 30;
    this.alignmentDist = 0;
    this.cohesionDist = 0;

    //health
    this.health = 100;
    this.healthDecrease = random(0.01, 0.1);
  }


  /**
   * drop food
   * @param  {[Array]} food
   */
  dropFood(food) {
    if(random(1) < 0.01) {
      food.push(new Food(this.position.x, this.position.y));
    }
  }
}
