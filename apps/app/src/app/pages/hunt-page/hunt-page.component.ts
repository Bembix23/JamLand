import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuntService } from './hunt.service';
import { filter, map, switchMap, take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { Pokemon } from '../model/pokemon';
import { Timers } from '../model/timers';
import { Counter } from '../model/counter';
import { AuthService } from '../../services/auth.service';
import { Pokeball } from '../model/counterPokeball';
import { MatButtonModule } from '@angular/material/button';

const defaultPokeball = {
  pokeball: { 
    number: 0,
    next: ''
  },
  superball: { 
    number: 0,
    next: ''
  },
  hyperball: { 
    number: 0,
    next: ''
  },
  masterball: { 
    number: 0,
    next: ''
  },
}

const defaultEnergie = {
    number: 0,
    next: ''
}

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    MatButtonModule,
  ],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {
  allPokemons: Pokemon[] = []
  pokemonHunt: Pokemon | null | undefined
  huntResult: string | null | undefined
  timers: Timers | undefined;
  energieCount: Counter = defaultEnergie;
  pokeballCount: Pokeball = defaultPokeball;

  constructor(
    private readonly huntServices: HuntService,
    private readonly authService: AuthService,
  ) {
    this.huntServices.getPokemonsList().pipe(take(1)).subscribe((value) => this.allPokemons = value.pokemons);
    this.authService.user$.pipe(
      filter((u) => !!u),
      map((u) => u?.uid || ''),
      switchMap((uid) => this.huntServices.getTimers(uid)),
      take(1)
    )
      .subscribe(u => {
      this.timers = {
        energie: u['energie'] || 1,
        pokeball: u['pokeball'] || 1,
        superball: u['superball'] || 1,
        hyperball: u['hyperball'] || 1,
        masterball: u['masterball'] || 1,
      }
      if (this.timers?.energie) {
        this.updateEnergie(this.timers?.energie)
        this.updatePokeball(this.timers?.pokeball, 'pokeball')
        this.updatePokeball(this.timers?.superball, 'superball')
        this.updatePokeball(this.timers?.hyperball, 'hyperball')
        this.updatePokeball(this.timers?.masterball, 'masterball')
      }
    })
  }

  transMillis(millis: number) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + seconds;
  }

  hunt() {
    this.pokemonHunt = this.allPokemons[Math.floor(Math.random()*this.allPokemons.length)]
    this.huntResult = null
    this.lostPointEnergie()
    if (this.timers) {
      this.updatePokeball(this.timers?.pokeball, 'pokeball')
      this.updatePokeball(this.timers?.superball, 'superball')
      this.updatePokeball(this.timers?.hyperball, 'hyperball')
      this.updatePokeball(this.timers?.masterball, 'masterball')
    }
    }

  pokeball(ball: number, type: string) {
    const chance = Math.floor(Math.random() * 10);
    if (chance < ball) {
      this.huntResult = `Le pokemon ${this.pokemonHunt?.name} est capturé`
      if (this.pokemonHunt?.id) {
        this.huntServices.sendPokemon(this.pokemonHunt?.id, this.pokemonHunt?.name)
      }
      this.pokemonHunt = null
    } else {
      this.huntResult = `Le pokemon ${this.pokemonHunt?.name} s'est enfui`
      this.pokemonHunt = null
    }
    this.lostPointPokeball(type)
  }

  updateEnergie(time: number) {
    console.log('tim', time)
    if (time === 1) {
      this.energieCount = {
        number: 10,
        next: this.transMillis(900000 - (Date.now() - time) % 900000)
      }
    } else {
      const count = Math.floor((Date.now() - time) / 900000);
      this.energieCount = {
        number: count > 10 ? 10 : count,
        next: this.transMillis(900000 - (Date.now() - time) % 900000)
      }
    }
    console.log(this.energieCount)
  }

  lostPointEnergie () {
    let time = 0
    if (this.energieCount?.number === 10 && this.timers?.energie) {
      time = Date.now() - 9 * 900000
    } else if (this.timers?.energie) {
      time = this.timers?.energie + 900000
    }
    this.huntServices.updateTimers(time, 'energie')
    this.updateEnergie(time)
    if (this.timers) {
      this.timers = {...this.timers, energie: time}
    }
  }

  updatePokeball(time: number, type: string) {
    if (time) {
      if (time === 1) {
        this.pokeballCount[type as keyof  Pokeball] = {
          number: 10,
          next: this.transMillis(450000 - (Date.now() - time) % 450000)
        }
      } else {
        const count = Math.floor((Date.now() - time) / 450000);
        this.pokeballCount[type as keyof  Pokeball] = {
          number: count > 10 ? 10 : count,
          next: this.transMillis(450000 - (Date.now() - time) % 450000)
        }
      }  
    }
    console.log('pokeballCount',this.pokeballCount)

  }

  lostPointPokeball (type: string) {
    let time = 0
    if (this.pokeballCount) {
      if (this.pokeballCount[type as keyof Pokeball]?.number === 10 && this.timers?.pokeball) {
        time = Date.now() - 9 * 450000
      } else if (this.timers?.pokeball) {
        time = this.timers?.pokeball + 450000
      }    
    }
    this.huntServices.updateTimers(time, type)
    console.log('1', type)
    this.updatePokeball(time, type)
    if (this.timers) {
      this.timers = {...this.timers, [type]: time}
    }
  }

}
