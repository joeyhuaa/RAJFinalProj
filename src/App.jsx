
import React, { useRef, useState, useEffect } from 'react';
import ProgressBar from './ProgressBar.jsx';
import PieChartFunctional from "./PieChartFunctional.jsx";
import ReactTooltip from 'react-tooltip';
import './App.css';

/* globals */
const actualRevData = [ 
  { name: "Medical Center", value: 45, color: '#F0BF00' }, 
  { name: "Student Fees", value: 4, color: '#F6E50E' }, 
  { name: "State of California", value: 8, color: '#FFF688' }, 
  { name: "Tuition", value: 11, color: '#5F63EC' }, 
  { name: "Research Grants and Contracts", value: 13, color: '#71A8FF'}, 
  { name: "Pell Grants", value: 1, color: '#0F7AB4' }, 
  { name: "Non-educational Services", value: 11, color: '#D4E4FF' }, 
  { name: "Gifts, Endowments, Interest, Etc.", value: 7, color: '#FFFFFF' } 
]
const actualExpData = [ 
  { name: "Medical Center", value: 43, color: '#F0BF00' },
  { name: "Teaching and Teaching Support", value: 23, color: '#F6E50E' }, 
  { name: "Research", value: 11, color: '#FFF688' }, 
  { name: "Student Services and Financial Aid", value: 8, color: '#5F63EC' }, 
  { name: "Operations and Maintenance (Buildings, etc)", value: 2, color: '#0F7AB4' }, 
  { name: "Administration", value: 3, color: '#71A8FF' }, 
  { name: "Non-Educational Services", value: 2, color: '#D4E4FF'  }, 
  { name: "Public Service", value: 2, color: '#FFFFFF' }, 
  { name: "Depreciation, Interest, etc.", value: 6, color: " #E3A400"} 
]
let table_elements
let inputs
let elems



/* App */ 
function App() {
    let [view, setView] = useState('revenue')
    let [revData, setRevData] = useState([ 
      { name: "Medical Center", value: 0, color: '#F0BF00'},
      { name: "State of California", value: 0, color: '#F6E50E'}, 
      { name: "Tuition", value: 0, color: '#FFF688'}, 
      { name: "Student Fees", value: 0, color: '#5F63EC'}, 
      { name: "Pell Grants", value: 0, color: '#0F7AB4'},
      { name: "Research Grants and Contracts", value: 0, color: '#71A8FF'}, 
      { name: "Non-educational Services", value: 0, color: '#D4E4FF' }, 
      { name: "Gifts, Endowments, Interest, Etc.", value: 0, color: '#FFFFFF'}]
    )
    let [expData, setExpData] = useState([
      { name: "Medical Center", value: 0, color: '#F0BF00' },
  { name: "Teaching and Teaching Support", value: 0, color: '#F6E50E' }, 
  { name: "Research", value: 0, color: '#FFF688' }, 
  { name: "Student Services and Financial Aid", value: 0, color: '#5F63EC' }, 
  { name: "Operations and Maintenance (Buildings, etc)", value: 0, color: '#0F7AB4' }, 
  { name: "Administration", value: 0, color: '#71A8FF' }, 
  { name: "Non-Educational Services", value: 0, color: '#D4E4FF'  }, 
  { name: "Public Service", value: 0, color: '#FFFFFF' }, 
  { name: "Depreciation, Interest, Etc.", value: 0, color: "#E3A400"} ]
    )
    let [message, setMessage] = useState("")

    function onInputChange(name, value) {
      let val;
      if(getTotal_name(name) == 100) {
        val = 0;
      } else if (getTotal_name(name)+parseInt(value) > 100) {
        val = 100 - getTotal_name(name)
      } else {
        val = value;
      }

      console.log(val)
      
      let dataCopy = [...getData()]
      let obj = dataCopy.find(x => x.name == name)
      obj.value = parseInt(val)

      if (view == 'revenue') setRevData(dataCopy)
      else if (view == 'expenses') setExpData(dataCopy)
    }

    function getTotal_name(name) {
      let total = 0;
      for(let i = 0; i < getData().length; i++) {
        if(getData()[i].name == name) {
          continue;
        }
        let value = 0;
        if(isNaN(getData()[i].value)) {
          value = 0
        } else {
          value = getData()[i].value
        }
        total = total + value
      }
      return total;
    }

    function getTotal() {
      let total = 0;
      for(let i = 0; i <getData().length; i++) {
        let value = 0;
        if(isNaN(getData()[i].value)) {
          value = 0
        } else {
          value = getData()[i].value
        }
        total = total + value
      }
      return total;
    }

    function getData() {
      if (view == 'revenue') return revData
      if (view == 'expenses') return expData
    }

    function getTitle() {
      if (view == 'revenue') return 'UC Davis Revenues'
      if (view == 'expenses') return 'UC Davis Expenditures'
      else return 'RESULTS'
    }

    async function handleOnClickInfo(name) {

      if (view === "revenue") {
        // fetch to revenue.json
        let result = await fetch('src/revenue.json')
        let json_file = await result.json()
        setMessage(json_file[name])
      } else {
        // fetch to expense.json
        let result = await fetch('src/expense.json')
        let json_file = await result.json()
        setMessage(json_file[name])
      }
    }

    if (view == 'revenue' || view == 'expenses') {
      /* first two views */
      console.log(message)
      table_elements = getData().map((x,i) => 
        <div className='table_element'> 
          <span className={`dot_${i+1}`}></span>
          <div className='table_element_label'>
            <span>{x.name}</span>
            <img 
              className='infoIcon' 
              data-tip
              data-for='infoToolTip'
              src="src/info.png" 
              onClick={() => handleOnClickInfo(x.name)}
            />
          </div>
          <ReactTooltip id='infoToolTip' place="top" effect="solid">
            {message}
          </ReactTooltip>
        </div>
      )

      inputs = getData().map((d,i) => {
        return (
          <input 
            type='number'
            className='table_input' 
            onChange={(x) => onInputChange(d.name, x.target.value)
            }
            inputmode="numeric"
            value={d.value}
          />
        )
      })

      elems = []
      for (let i = 0; i < getData().length; i++) {
        elems.push(table_elements[i])
        elems.push(inputs[i])
      }
    }

    return (
      <div id='container'>
        <ProgressBar view={view} />

        <div id="title">
          {getTitle()}
        </div>

        <div>
          {(view == 'revenue' || view == 'expenses') &&
            <div>
              <div id="chart">
                <PieChartFunctional 
                  name={"pie1"} 
                  data={getData()} 
                />
              </div>

              <div id='table'>
                <div id="function"> Function </div>
                <div id="percentage"> Percentage (%) </div>
                {elems}
              </div>

              <div style={{display:'flex', justifyContent:'flex-end'}}>
                <div className='total_table_element'> Total % </div>
                <div className = 'table_input'> {getTotal()} </div>
              </div>
            </div>
          }

          {view.includes('compare') &&
            <div>
              <div className='heading'>
                {view == 'compare-rev' ?
                'Your Revenue Guess' : 
                'Your Expenses Guess'}
              </div>
              <PieChartFunctional 
                name={"pie1"} 
                data={view == 'compare-rev' ? revData : expData} 
              />
              <div className='heading'>
                {view == 'compare-rev' ? 
                'Actual Revenue' :
                'Actual Expenses'}
              </div>
              <PieChartFunctional 
                name={"pie2"} 
                data={view == 'compare-rev' ? actualRevData : actualExpData} 
              />
            </div>
          }
        </div>


        {view === 'expenses' && 
          <div>
            <button 
              id='compare_button' 
              className="hide"
              onClick={() => setView('compare-rev')}
            >Compare</button>
            <button 
              id='previous_button' 
              className="hide"
              onClick={() => setView('revenue')}
            >Previous</button>

          </div>
        }
        
        {(view == 'revenue' || view == 'compare-rev') && 
          <button 
            id='next_button'
            onClick={() => {
              if (view == 'revenue') setView('expenses')
              if (view == 'compare-rev') setView('compare-exp')
            }}
          >
            Next
          </button>
        }

        {(view == 'compare-exp') && 
          <button 
            id='restart_button'
            onClick={() => {
              // reset all data and go back to reveue view
              let revDataCopy = [...revData].map(d => ({...d, value: 0}))
              let expDataCopy = [...expData].map(d => ({...d, value: 0}))
              setRevData(revDataCopy)
              setExpData(expDataCopy)
              setView('revenue')
            }}
          >
            Restart
          </button>
        }
      </div>
    )
}

export default App;


    