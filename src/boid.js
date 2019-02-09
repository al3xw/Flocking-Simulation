class Boid {

  constructor(x, y) {
    this.position = createVector(x,y);
    this.accelertion = createVector(0,0);
    this.velocity = createVector(random(-20,20), random(-20,20));
    this.radius = 40;
    this.maxSpeed = 10;
    this.maxForce = 10;
    this.color = color('#FFFFFF');

    //flocking-system
    this.separationDist = 25.0;
    this.alignmentDist = 50;
    this.cohesionDist = 50;

    //health
    this.health = 100;
    this.healthDecrease = random(1);

    this.flock = new Flock(this);
  }


  /**
   * applys flocking-sytem to boids
   * @param  {[Array]} boids boids to apply
   */
  applyFlock(boids) {
    let sep = this.flock.separate(boids);
    let ali = this.flock.alignment(boids);
    let coh = this.flock.cohesion(boids);
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }


  /**
   * applys force to accelertion
   * @param  {[p5.Vector]} force
   */
  applyForce(force) {
    // Später Masse hinzufügen A = F/M
    this.accelertion.add(force);
  }


  /**
   * updates
   */
  update() {
    this.velocity.add(this.accelertion);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.accelertion.mult(0);
    this.health -= this.healthDecrease;
  }


  /**
   * keeps boid in canvas
   * @return {[type]} [description]
   */
  edges() {
    // if (this.position.x < this.radius || this.position.x > width - this.radius) {
    //   this.velocity.x = 0 - this.velocity.x
    // }
    // if (this.position.y < this.radius || this.position.y > height - this.radius) {
    //   this.velocity.y = 0 - this.velocity.y
    // }
    if(this.position.x < -this.radius) this.position.x = width+this.radius;
    if(this.position.y < -this.radius) this.position.y = height+this.radius;
    if(this.position.x > width + this.radius) this.position.x = -this.radius;
    if(this.position.y > height + this.radius) this.position.y = -this.radius;
  }


  /**
   * renders triangle
   */
  show() {
    var angle = this.velocity.heading() + radians(90);
    fill(this.color);

    stroke(this.color);
    push();
    translate(this.position.x,this.position.y);
    rotate(angle);
    beginShape();
    vertex(0, -this.radius * 2);
    vertex(-this.radius, this.radius * 2);
    vertex(this.radius, this.radius * 2);
    endShape(CLOSE);
    pop();
  }


  /**
   * returns if boids is dead
   * @return {[boolean]} isBoidDead
   */
  dead() {
    if (this.health <= 0) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * calcultes steering to next food
   * @param  {[Array]} food
   * @param  {[Number]} radiusBoid radius around Boid
   * @return {[p5.Vector]}            steering to next Food
   */
  eat(food, radiusBoid) {
    let close = null;
    let record = Infinity;
    // for (let i = food.length - 1; i >= 0; i--) {
    for (let i = 0; i < food.length; i++) {
      let dist = p5.Vector.dist(this.position, food[i].position);
      if (dist < (this.radius * 2)) {
        this.health += food[i].health;
        food.splice(i, 1);

      } else {
        if (dist < record && dist < radiusBoid) {
          record = dist;
          close = food[i];
        }
      }

    }

    if (close !== null) {
      return this.flock.seek(close);
    } else {
      return createVector(0,0);
    }
  }
}
