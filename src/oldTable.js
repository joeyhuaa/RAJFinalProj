 <div class='table_element'> 
            <span class="dot_1"></span>
            Medical center 
          </div>
          <input class='table_input' 
            onChange={(x) => onInputChange("Medical Center",x.target.value)}
          />
          <div class='table_element'> 
            <span class="dot_2"></span>
            State unrestricted 
          </div>
          <input class='table_input'
            onChange={(x) => onInputChange("State Unrestricted",x.target.value)}
          />
          <div class='table_element'>
            <span class="dot_3"></span> Tuition 
          </div>
          <input class='table_input'
            onChange={(x) => onInputChange("Tuition",x.target.value)}
          />
          <div class='table_element'>
            <span class="dot_4"></span> Student Fees 
          </div>
          <input class='table_input'
            onChange={(x) => onInputChange("Student Fees",x.target.value)}
          />
          <div class='table_element'> 
            <span class="dot_5"></span>
            Grants and Contracts 
          </div>
          <input class='table_input'/>
          <div class='table_element'>
            <span class="dot_6"></span>
            Sales and Service, Auxillary
          </div>
          <input class='table_input'/>
          <div class='table_element'> 
            <span class="dot_7"></span>
            Other
          </div>
          <input 
            class='table_input' 
            onChange={(x) => onInputChange("Other", x.target.value)} 
          />
          <div class='total_table_element'> 
            Total %
          </div>
          <input class='table_input' />
           </div>