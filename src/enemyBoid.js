class EnemyBoid extends Boid {
  
  constructor(x, y) {
    super(x, y);
    this.accelertion = createVector(0,0);
    this.velocity = createVector(random(-2,2), random(-2,2));
    this.radius = 7.0;
    this.maxSpeed = 1.5;
    this.maxForce = 0.03;

    // this.color = color('#5490CC');
    this.color = color('#BF3971')

    //flocking-system
    this.separationDist = 30;
    this.alignmentDist = 0;
    this.cohesionDist = 0;

    //health
    this.health = 100;
    this.healthDecrease = random(0.1, 1);
  }
}
