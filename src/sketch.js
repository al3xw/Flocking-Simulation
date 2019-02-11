let enemyBoids = [];
let foodBoids = [];
let normalBoids = [];

let food = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  addEnemyBoids(random(1,3));
  addNormalBoid(random(15, 45));
  addFoodBoids(random(2,4));
}


function draw() {
  background(color('#1F1F21'));

  updateEnemyBoid();
  updateFoodBoid();
  updateNormalBoid();

  updateFood();
  reset();
}


/**
 * adds amount EnemyBoid(s)
 * @param {[Number]} amount
 */
function addEnemyBoids(amount) {
  for (let i = 0; i < amount; i++) {
    let x = random(width);
    let y = random(height);
    enemyBoids.push(new EnemyBoid(x, y));
  }
}


/**
 * adds amount FoodBoid(s)
 * @param {[Number]} amount
 */
function addFoodBoids(amount) {
  for (let i = 0; i < amount; i++) {
    let x = random(width);
    let y = random(height);
    foodBoids.push(new FoodBoid(x, y));
  }
}


/**
 * adds amount NormalBoid(s)
 * @param {[Number]} amount
 */
function addNormalBoid(amount) {
  for (let i = 0; i < amount; i++) {
    let x = random(width);
    let y = random(height);
    normalBoids.push(new NormalBoid(x, y));
  }
}


/**
 * Updates EnemyBoid(s)
 */
function updateEnemyBoid() {
  for (let i = 0; i < enemyBoids.length; i++) {
    enemyBoids[i].applyFlock(enemyBoids);
    enemyBoids[i].update();
    enemyBoids[i].edges();
    enemyBoids[i].show();

    // eat
    let goodFood = enemyBoids[i].eat(normalBoids, 50);
    goodFood.mult(3);
    enemyBoids[i].applyForce(goodFood);

    // dead
    if (enemyBoids[i].dead()) enemyBoids.splice(i, 1);
  }
}


/**
 * Updates Food
 */
function updateFood() {
  for (let i = 0; i < food.length; i++) {
    food[i].show();
  }
}


/**
 * Updates FoodBoid(s)
 */
function updateFoodBoid() {
  for (let i = 0; i < foodBoids.length; i++) {
    foodBoids[i].applyFlock(normalBoids);
    foodBoids[i].update();
    foodBoids[i].edges();
    foodBoids[i].show();

    foodBoids[i].dropFood(food);

    //dead
    if (foodBoids[i].dead()) foodBoids.splice(i, 1);
  }
}


/**
 * Updates NormalBoid(s)
 */
function updateNormalBoid() {
  for (let i = 0; i < normalBoids.length; i++) {
    normalBoids[i].applyFlock(normalBoids);
    normalBoids[i].update();
    normalBoids[i].edges();
    normalBoids[i].show();

    // eat
    let goodFood = normalBoids[i].eat(food, 50);
    goodFood.mult(3);
    normalBoids[i].applyForce(goodFood);

    // duplicate
    if (normalBoids.length < 40) normalBoids[i].duplicate(normalBoids);

    // dead
    if (normalBoids[i].dead()) {
      normalBoids.splice(i, 1);
    }
  }
}


/**
 * Resets boids
 */
function reset() {
  if (enemyBoids.length < 1 && random(1) < 0.1) addEnemyBoids(1);
  if (foodBoids.length < 1 && random(1) < 0.1) addFoodBoids(random(1,2));
  if (normalBoids.lengt < 1 && random(5) < 0.1) addNormalBoid(random(10,20));
}
