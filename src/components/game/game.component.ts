import { Component, OnInit } from '@angular/core';
import { Image } from 'src/models/image';
import { Player } from 'src/models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  listOfImages: Image[] = [];
  actualDisplayingImages: Image[] = []

  questionSRC: string = "question";
  whiteBlockSRC: string = "white-block";

  intervalId: NodeJS.Timer | undefined;

  player1: Player
  player2: Player

  actualPlayer: Player;
  
  constructor() { 
    this.player1 = new Player("Oskar", 0);
    this.player2 = new Player("Martyna", 0);
    this.actualPlayer = this.player1;
  }

  ngOnInit(): void {
    this.createBoard();
    this.shuffleImages();
  }

  createBoard() {
    for (let index = 1; index < 51; index++) {
      if (index > 25) {
        this.listOfImages.push(new Image(index, index - 25, "assets/" + this.questionSRC + ".jpg"));
        continue;
      }

      this.listOfImages.push(new Image(index, index, "assets/" + this.questionSRC + ".jpg"));
    }
    console.log(this.listOfImages);
  }

  shuffleImages() {
    this.listOfImages = this.listOfImages
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  displayImageOnClick(id: number) {
    if (this.actualDisplayingImages.length == 2 || this.actualDisplayingImages.at(0)?.id == id) return;

    let imageId: number = id;
    if (id > 25) {
      imageId = id - 25;
    }
    let index = this.listOfImages.findIndex(x => x.id == id);
    this.actualDisplayingImages.push(this.listOfImages[index]);
    this.listOfImages[index].path = "assets/" + imageId + ".jpg";

    if (this.actualDisplayingImages.length == 2) {
      if (this.checkPair()) return
      this.intervalId = setInterval(() => this.hideImage(), 1000)
    };
  }
  hideImage() {

    for (let index = 0; index < this.actualDisplayingImages.length; index++) {
      let imageIndex = this.listOfImages.findIndex(x => x.id == this.actualDisplayingImages[index].id)
      this.listOfImages[imageIndex].path = "assets/" + this.questionSRC + ".jpg";
    }

    this.clearAcutalDisplayingImage();
    clearInterval(this.intervalId);
    this.changePlayer();

  }

  checkPair(): boolean {

    if (this.actualDisplayingImages[0].imageId == this.actualDisplayingImages[1].imageId) {

      for (let index = 0; index < this.actualDisplayingImages.length; index++) {
        let imageIndex = this.listOfImages.findIndex(x => x.id == this.actualDisplayingImages[index].id)
        this.listOfImages[imageIndex].path = "assets/" + this.whiteBlockSRC + ".jpg";
      }
      this.clearAcutalDisplayingImage();
      this.actualPlayer.points ++;
      return true;
    }

    return false;
  }

  clearAcutalDisplayingImage() {
    this.actualDisplayingImages.splice(0);
  }

  changePlayer() {
    if (this.actualPlayer == this.player1) this.actualPlayer = this.player2;
    else this.actualPlayer = this.player1;
  }
}
