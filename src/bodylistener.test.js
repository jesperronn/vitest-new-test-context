import {afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('bodylistener', () => {
  const default_html = `
    <form method="post" name="" action="/submit" class="form">
      <input type="hidden" name="password" value="" class="js-passw" autocomplete="off">

      <div class="items mb-4">
        <div class="js-icon js-icon-1" data-passw="A">
            <div class="icon-1"></div>
        </div>
        <div class="js-icon js-icon-2" data-passw="B">
            <div class="icon-2"></div>
        </div>
      </div>

    </form>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  `;

  beforeEach( async () => {
    await window.happyDOM.waitUntilComplete();
    document.body.innerHTML = default_html;
    vi.resetModules();
    await import('./bodylistener.js');
  })

  afterEach(async () => {
    //document.write('<p>cleared</p>')
    document.body.innerHTML = '';
    // document.replaceWith(document.cloneNode(true));

    await window.happyDOM.waitUntilComplete();
    vi.resetModules();
    vi.restoreAllMocks()
  })

  describe('body listener', () => {
    test('test click iconB, iconA', async () => {
      const passwInput = document.querySelector('.js-passw');
      const iconA = document.querySelector('.js-icon-1');
      const iconB = document.querySelector('.js-icon-2');
      expect(iconA).toBeDefined();
      expect(iconB).toBeDefined();

      await iconB.click();
      await iconA.click();


      expect(passwInput.value).toBe('BA');
    })

    test('expect jquery $ to exist', () => {
      expect($).toBeDefined();
    })

    test.skip('test 2', () => {})

    test.skip('test 3', () => {})

    test('test click iconA', async () => {
      const passwInput = document.querySelector('.js-passw');
      const iconA = document.querySelector('.js-icon-1');
      expect(iconA).toBeDefined();

      await iconA.click();

      expect(passwInput.value).toBe('A');
    })

    test('test click iconA, iconB', () => {
      const passwInput = document.querySelector('.js-passw');
      const iconA = document.querySelector('.js-icon-1');
      const iconB = document.querySelector('.js-icon-2');
      expect(iconA).toBeDefined();
      expect(iconB).toBeDefined();

      iconA.click();
      iconB.click();

      expect(passwInput.value).toBe('AB');
    })

  })

});
