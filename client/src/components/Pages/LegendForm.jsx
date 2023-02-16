import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../index';
import {observer} from 'mobx-react-lite';


function LegendForm() {
    const {store} = useContext(Context);

    const [body, setBody] = useState('');
    const [copyright, setCopy] = useState('');
     
    function f(){
        store.addLegend(body,copyright);
    }

    store.getLegends();

  return (
    <div>
        <input placeholder='body' type='text' value={body} onChange={(e) => setBody(e.target.value)}/>
        <input placeholder='copyright' type='text' value={copyright} onChange={(e) => setCopy(e.target.value)}/>
        <button onClick={f}>POST</button>
         <div>{store.legends.map(legend => <div key={legend._id}><h3>{legend.copyright}</h3> <p>{legend.body}</p></div>)}</div>
    </div>
  )
}

export default observer(LegendForm);
