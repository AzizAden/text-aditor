import { getDatabase, putDatabase } from './database';
import { textHeader } from './header';

export default class TextEditor {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in the database.
    // Fall back to localStorage if nothing is stored in the database, and if neither is available, set the value to textHeader.
    getDatabase().then((data) => {
      console.info('Loaded data from the database, injecting into the editor');
      this.editor.setValue(data || localData || textHeader);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself loses focus
    this.editor.on('blur', () => {
      console.log('Saving content...');
      putDatabase(localStorage.getItem('content'));
    });
  }
}
