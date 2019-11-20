export class Month extends HTMLElement {
    constructor()
    {
        super();

        this.monthName = this.getAttribute('month-name');
        this.monthNumber = this.getAttribute('month-number');

        const month = moment().month(this.monthName);
        const daysNumber = month.daysInMonth();

        let daysArr = [];
        for(let i = 1; i <= daysNumber; i++)
        {
            daysArr.push(i);
        }
        let components = ``;
        daysArr.forEach((element) => {
            let weekDay = moment('2019/'+this.monthNumber+'/'+element, 'YYYY/MM/DD');
            let isWeekend = false;

            if (element == '1' && weekDay.format("dddd") !== 'Monday')
            {
                let days = weekDay.day();
                if (days == 0)
                {
                    days = 7;
                }
                let pastWeekDay = '';
                for(var i = days-1; i > 0; i--)
                {
                    pastWeekDay = moment('2019/'+this.monthNumber+'/'+element, 'YYYY/MM/DD').subtract(i, 'days');
                    
                    components += `<c-day past-day= true; day="${pastWeekDay.format('DD')}" week_day="${pastWeekDay.format('dddd')}"></c-day>`
                }
            }

            if (weekDay.format('dddd') == 'Sunday' || weekDay.format('dddd') == 'Saturday')
            {
                console.log('is weekend');
                isWeekend = true;
            }

            if (weekDay.format('dddd') == 'Sunday')
            {
                components += `<c-day is-weekend="${isWeekend}" day="${element}" week_day="${weekDay.format('dddd')}"></c-day><br />`;
            }
            else
            {
                components += `<c-day is-weekend="${isWeekend}" day="${element}" week_day="${weekDay.format('dddd')}"></c-day>`;
            }
        });
        this.innerHTML = `
            <style>
                c-month
                {
                    padding: 10px;
                }
                .month h2
                {
                    text-align: center;
                }
                c-day
                {
                    display: inline-block;
                }
            </style>
            <div class="month">
                <h2>${this.monthName}</h2>
                <div class="month-days">
                    ${components}
                </div>
            </div>
        `;
    }

    connectedCallback()
    {
    }

    // static get observedAttributes()
    // {
    //     return ['nombre'];
    // }
    
    attributeChangedCallback(name, older, current)
    {
    }
}

customElements.define('c-month', Month);