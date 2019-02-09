class Flock {

  constructor(currentBoid) {
    this.currentBoid = currentBoid;
  }


  /**
   * returns steering vector
   * @param  {[p5.Vector]} sum
   * @return {[p5.p5.Vector]}     steer vector
   */
  returnSteer(sum) {
    sum.normalize();
    sum.mult(this.currentBoid.maxSpeed);
    let steer = p5.Vector.sub(sum, this.currentBoid.velocity);
    steer.limit(this.currentBoid.maxForce);
    return steer;
  }


  /**
   * returns seek Vector
   * @param target
   * @return {[p5.Vector]}  seek vector
   */
  seek(target) {
    let desired = null;
    desired = p5.Vector.sub(target.position, this.currentBoid.position);
    desired.setMag(this.currentBoid.maxSpeed);
    let steer = p5.Vector.sub(desired, this.currentBoid.velocity);
    steer.limit(this.currentBoid.maxForce);
    return steer;
  }


  /**
   * calculates alignment
   * @param  {[Array]} boids alignment to this boids
   * @return {[p5.Vector]}     alignment vector
   */
  alignment(boids) {
    let neighbordist = this.currentBoid.alignmentDist;
    let sum = createVector(0,0);
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.currentBoid.position, boids[i].position);
      if((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.returnSteer(sum);
    } else {
      return createVector(0,0);
    }
  }


  /**
  * calculates cohesion
  * @param  {[Array]} boids cohesion to this boids
  * @return {[p5.Vector]}       cohesion vector
  */
  cohesion(boids) {
    let neighbordist = this.currentBoid.cohesionDist;
    let sum = createVector(0,0);
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.currentBoid.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.sub(this.currentBoid.position);
      return this.returnSteer(sum);
    } else {
      return createVector(0,0);
    }
  }


  /**
   * calculates seperation
   * @param  {[Array]} boids seperation to this boids
   * @return {[p5.Vector]}       seperation vector
   */
  separate(boids) {
      let desiredseparation = this.currentBoid.separationDist;
      let steer = createVector(0,0);
      let count = 0;

      for (let i = 0; i < boids.length; i++) {
        let dist = p5.Vector.dist(this.currentBoid.position, boids[i].position);
        if ((dist > 0) && (dist < desiredseparation)) {
          let diff = p5.Vector.sub(this.currentBoid.position, boids[i].position);
          diff.normalize();
          diff.div(dist);
          steer.add(diff);
          count++;
        }
      }

      if (count > 0) {
        steer.div(count);
      }

      if (steer.mag() > 0) {
        steer.normalize();
        steer.mult(this.currentBoid.maxSpeed);
        steer.sub(this.currentBoid.velocity);
        steer.limit(this.currentBoid.maxForce);
      }
      return steer;
  }
}
