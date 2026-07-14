/*
 * Calico Rose
 * Converted to p5 instance mode for web embedding:
 * - every p5 function like createVector, random, fill, ellipse etc. is now prefixed with p. or this.p
 * - every class constructor now takes p as its first argument and stores it as this.p
 * - canvas sized to the container div rather than the full window
 */

class Particle {
    constructor(p, x, y, hue) {
        this.p = p;
        this.pos = p.createVector(x, y);
        this.vel = p.createVector(0, 0);
        this.acc = p5.Vector.random2D();
        this.acc.mult(p.random(0.05));
        this.hue = hue;
        this.colorAlpha = 255;
        this.done = false;
    }

    update() {
        this.finished();
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.colorAlpha -= 2.5;
    }

    display() {
        this.p.noStroke();
        this.p.fill(this.hue, this.p.random(255), this.colorAlpha);
        this.p.ellipse(this.pos.x, this.pos.y, 2, 2);
    }

    finished() {
        if (this.colorAlpha < 0) {
            this.done = true;
        } else {
            this.done = false;
        }
    }
}

class System {
    constructor(p, x, y, hue) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.particles = [];
        this.numParticles = 30;
        this.hue = hue;
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new Particle(p, this.x, this.y, this.hue));
        }
        this.done = false;
    }

    update() {
        this.finished();
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].done) {
                this.particles.splice(i, 1);
            }
        }
    }

    display() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].display();
        }
    }

    finished() {
        if (this.particles.length == 0) {
            this.done = true;
        } else {
            this.done = false;
        }
    }
}

const fairyTrail = (p) => {
    let particleSystem = [];
    let hueArray = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250];
    let video;
    let bodyPose;
    let poses = [];
    let lastPersonSeen;

    p.preload = () => {
        bodyPose = ml5.bodyPose("MoveNet");
    };

    function gotPoses(results) {
        poses = results;
    }

    function idle() {
        if (p.random() < 0.05) {
            particleSystem.push(
                new System(
                    p,
                    p.random(p.width / 4, p.width - p.width / 2),
                    p.random(p.height / 4, p.height - p.height / 4),
                    p.random(10) * 25,
                ),
            );
        }
    }

    p.setup = () => {
        let container = document.getElementById("fairy-trail-container");
        let canvas = p.createCanvas(
            container.offsetWidth,
            container.offsetHeight,
        );
        canvas.parent("fairy-trail-container");
        p.colorMode(p.HSB);
        video = p.createCapture(p.VIDEO);
        video.hide();
        bodyPose.detectStart(video, gotPoses);
    };

    p.draw = () => {
        p.push();
        p.translate(p.width / 1.5, 0);
        p.scale(-1, 1);
        p.background(0);

        if (poses.length > 0) {
            if (p.millis() - lastPersonSeen >= 2000) {
                hueArray = p.shuffle(hueArray, true);
            }
            lastPersonSeen = p.millis();

            for (let i = 0; i < poses.length; i++) {
                for (let j = 0; j < poses[i].keypoints.length; j++) {
                    if (poses[i].keypoints[j].confidence > 0.5) {
                        particleSystem.push(
                            new System(
                                p,
                                poses[i].keypoints[j].x,
                                poses[i].keypoints[j].y,
                                hueArray[i],
                            ),
                        );
                        break;
                    }
                }
            }
        } else {
            idle();
        }

        for (let i = particleSystem.length - 1; i >= 0; i--) {
            particleSystem[i].update();
            particleSystem[i].display();
            if (particleSystem[i].done) {
                particleSystem.splice(i, 1);
            }
        }
        p.pop();
    };

    p.mouseClicked = () => {
        particleSystem.push(new System(p, p.mouseX, p.mouseY));
    };
};

new p5(fairyTrail);
