import React from 'react'

export default function ProgressBar({
  view
}) {
  console.log(view)
  return (
    <div id="journey_bar"> 
      <div className='journey_labels'>
        <p className='blue_txt'>REVENUE</p>
        {(view == 'expenses' || view.includes('compare')) &&
          <p className='blue_txt'>EXPENSES</p>
        }
        {view.includes('compare') &&
          <p className='blue_txt'>COMPARE</p>
        }
        {(view != 'expenses' && !view.includes('compare')) && 
          <p>EXPENSES</p>
        }
        {!view.includes('compare') &&
          <p>COMPARE</p>
        }
      </div>
      <div className='journey_icons'>
        <div className='circle blue_bg'></div>
        <div 
          className={
            (view == 'expenses' || view.includes('compare')) ? 'journey_rect blue_bg' : 'journey_rect'
          }
        ></div>
        <div className={
          (view == 'expenses' || view.includes('compare')) ? 'circle blue_bg' : 'circle'
        }></div>
        <div 
          className={
            view.includes('compare') ? 'journey_rect blue_bg' : 'journey_rect'
          }
        ></div>
        <div className={
          view.includes('compare') ? 'circle blue_bg' : 'circle'
        }></div>
      </div>
    </div>
  )
}

