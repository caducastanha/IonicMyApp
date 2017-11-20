import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { DetalhesPage } from '../detalhes/detalhes';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    MovieProvider
  ]
})
export class HomePage {
  public objeto_home = {
    titulo:"Cadu Castanha",
    data:"November 5, 1995",
    descricao:"Estou criando o goeat",
    qntd_likes: 22,
    qntd_comments: 6,
    time_comment:"23h ago"
  }

  public lista_filmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(public navCtrl: NavController, private movieProvider: MovieProvider, public loadingCtrl: LoadingController) {

  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregaFilmes();
  }

  ionViewDidEnter() {
    this.carregaFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme)
    this.navCtrl.push(DetalhesPage, { id: filme.id });
  }
  carregaFilmes() {
    this.abreCarregando();

    this.movieProvider.getLatesMovies().subscribe(data=>{

      const objeto_retorno = JSON.parse(JSON.stringify( data ));
      this.lista_filmes = objeto_retorno.results;
      console.log(objeto_retorno);
      this.fechaCarregando();
      if(this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }, error =>{
        console.log(error);
        this.fechaCarregando();
        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
    })
  }
}
