import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, Button, Form } from '../widgets';
import { produktIDService } from '../services/ProduktIDService.js';
import {sykkelService} from '../services/SykkelService.js';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { bestillingService } from '../services/BestillingService.js';

class SykkelID extends Component {
  sykkelid = [];
  info = [];
  status = [];
  avdeling =[];
  render() {
    return (
      <div className="col-md-4" style={{ margin: '30px' }}>
        <h3> Avvik </h3>
        <h4>Søk opp sykkel id for å endre status og avdeling: </h4>
        <div>
        <input
          id="id"
          name="id"
          type="number"
          placeholder="ID"
          className="form-control input-md shadow"
          onChange={event => (this.sykkelid = event.target.value)}
          required
        />
        </div>

        <Row>
          <Column left>
            <Button.Light
            onClick={() => {
              this.sok(this.sykkelid);
              }}
            >
              Søk
            </Button.Light>
          </Column>
          <Column right>

            <Button.Success
             onClick={this.oppdater}
                >
              Lagre endringer</Button.Success>
          </Column>

        </Row>
        <div  style={{marginTop:"50px"}}>

        <div>  ID: {this.info.sykkel_id}  </div>
        <div> Typenavn: {this.info.typenavn} </div>
        <div> Eier: {this.info.navn}  </div>
        <Form.Label>Nå avdeling:</Form.Label>
        <br />
        <select id="avdSel" onChange={() => {
          this.updateAvdeling(event)
        }}>
          {this.avdeling.map(avdeling => (
            <option key={avdeling.avdeling_id} id={avdeling.avdeling_id}>
              {avdeling.navn}
            </option>
          ))}
        </select>
        <div> </div>
        <Form.Label>Status:</Form.Label>
        <br />
        <select value={this.info.status_id} onChange={e => (this.info.status_id = e.target.value)}>
          {this.status.map(status => (
            <option key={status.status_id} value={status.status_id}>
              {status.tilstand}
            </option>
          ))}
        </select>

        </div>
      </div>
    );
  }
  sok(id) {
    if (id!=0)
    produktIDService.getSykkelByID(id, success => {
      this.info = success;
      console.log(this.info);

    });
    bestillingService.tilstander(status => {
      this.status = status;
    });
    sykkelService.getAvdelinger(avdeling => {
      console.log(avdeling);
      this.avdeling = avdeling;
    })
  }
  oppdater(){
    produktIDService.updateSykkelByID(this.info.status_id, this.info.naa_avdeling_id, this.sykkelid);
};
updateAvdeling(e){
  console.log("status id" + this.info.status_id);
  let sel = document.getElementById(e.target.id);
  this.info.naa_avdeling_id = sel[sel.selectedIndex].id;
  console.log(this.info.naa_avdeling_id);
}
}
export { SykkelID };
