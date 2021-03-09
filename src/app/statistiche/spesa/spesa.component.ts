import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { forEach } from "lodash-es";
import * as moment from "moment";
import { Statistica } from "../../model/statistica";
import { StatisticheService } from "../../services/statistiche.service";

@Component({
  selector: "app-spesa",
  templateUrl: "./spesa.component.html",
  styleUrls: ["./spesa.component.scss"],
})
export class SpesaComponent implements OnInit {
  // opzioni barre
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  barreSpesa: Statistica[] = [];

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private statisticheService: StatisticheService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log("init SpesaComponent");
    this.route.data.subscribe((data) => {
      this.barreSpesa = data.barreSpesa;
      forEach(this.barreSpesa, (item: Statistica) => {
        let mese = item.name;
        mese = moment(mese, "YYYYMM").format("MMMM YYYY");
        item.name = mese;
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      frequenza: ["M", Validators.required],
    });

    this.form.controls.frequenza.valueChanges.subscribe((value: string) => {
      console.log("value = " + value);
      this.statisticheService.spesa(value).subscribe((data: Statistica[]) => {
        this.barreSpesa = data;
        if (this.mensile()) {
          _.forEach(this.barreSpesa, (item: Statistica) => {
            let mese = item.name;
            mese = moment(mese, "YYYYMM").format("MMMM YYYY");
            item.name = mese;
          });
        }
      });
    });
  }

  xAxisTickFormatting(value) {
    const formatter = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const retValue = formatter.format(value);
    return retValue;
  }

  mensile(): boolean {
    return _.isEqual(this.form.value.frequenza, "M");
  }

  annuale(): boolean {
    return _.isEqual(this.form.value.frequenza, "Y");
  }
}
