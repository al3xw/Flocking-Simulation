class Food {

  constructor(x,y) {
    this.position = createVector(x, y);
    this.health = random(1, 5);
    this.color = color('#E8E8E8');
  }

  /**
   * renders food
   */
  show() {
    fill(this.color);
    stroke(this.color);
    ellipse(this.position.x, this.position.y, this.health);
  }
}
