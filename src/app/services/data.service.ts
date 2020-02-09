import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../Model/api-response";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  baseUrl = "http://localhost:5000/compaigns";

  getPosts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }
}
