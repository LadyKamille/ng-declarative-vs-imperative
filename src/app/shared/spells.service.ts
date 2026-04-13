import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

export interface Spell {
  index: string;
  level: number;
  name: string;
  url: string;
}

export interface SpellDetails extends Spell {
  school: string;
  desc: Array<string>;
  components: Array<string>;
  material: string;
  ritual: boolean;
  duration: string;
  concernation: boolean;
  casting_time: string;
  level: number;
  area_of_effect: { type: string; size: number };
  classes: Array<any>;
  subclasses: Array<any>;
}

export interface Spells {
  results: Array<Spell>;
}

@Injectable({
  providedIn: 'root',
})
export class SpellsService {
  readonly baseUrl = 'https://www.dnd5eapi.co';
  readonly spellsBaseUrl = 'https://www.dnd5eapi.co/api/2014/spells';

  private httpClient = inject(HttpClient);

  getAll$(): Observable<Spells> {
    return this.httpClient.get<Spells>(this.spellsBaseUrl);
  }

  getAll(): Promise<Spells> {
    return lastValueFrom(this.getAll$());
  }

  get$(url: string): Observable<SpellDetails> {
    return this.httpClient.get<SpellDetails>(`${this.baseUrl}${url}`);
  }

  get(url: string): Promise<SpellDetails> {
    return lastValueFrom(this.get$(url));
  }
}
