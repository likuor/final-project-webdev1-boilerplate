import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Countries');
  }

  async getHTML() {
    return '<h1>Countries</h1>';
  }
}
