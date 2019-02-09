const GENDER = {
  MALE : 'Male',
  FEMALE : 'Female'
}

class NormalBoid extends Boid {

  constructor(x, y) {
    super(x, y);
    this.accelertion = createVector(0,0);
    this.velocity = createVector(random(-2,2), random(-2,2));
    this.radius = 4.0;
    this.maxSpeed = 3.5;
    this.maxForce = 0.05;

    //flocking-system
    this.separationDist = 20;
    this.alignmentDist = 50;
    this.cohesionDist = 50;

    //gender
    this.gender = random(1) < 0.5 ? GENDER.MALE : GENDER.FEMALE;
    // this.color = color('#2465D9');
    if (this.gender === GENDER.MALE) this.color = color(36, 101, 217);
    // this.color = color('#EC593E');
    if (this.gender === GENDER.FEMALE) this.color = color(236, 89, 62);

    //health
    this.health = 100;
    this.healthDecrease = random(0.005, 0.1);
  }


  /**
   * duplicates Boids
   * @param  {[Array]} boids
   */
  duplicate(boids) {
    for (let i = 0; i < boids.length; i++) {
      let dist = p5.Vector.dist(this.position, boids[i].position);
      if ((dist < this.radius * 2) && this.gender != boids[i].gender) {
        if(random(1) < 0.1) {
          let x = this.position.x + random(this.velocity.x, boids[i].velocity.x);
          let y = this.position.y + random(this.velocity.y, boids[i].velocity.y);
          boids.push(new NormalBoid(x, y));
          console.log("duplication");
          break;
        }
      }
    }
  }

}
