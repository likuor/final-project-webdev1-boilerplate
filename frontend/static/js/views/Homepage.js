import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Homepage');
  }

  async getHTML() {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    h1.innerHTML = 'Title';

    return `
    <div class='container'>
        <div class='bg-pic'>
          <div class='title-text'>
            <h1>Get ready to travel?</h1>
            <p>Serach countries you want to go</p>

            <div class='title-button'>
              <a href='/countries'>
                <div class='button'>
                  <span>Go Search</span>
                </div>
              </a>
            </div>
          </div>
        </div>
    </div>
    `;
  }
}
