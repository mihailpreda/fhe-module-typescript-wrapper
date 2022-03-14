<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="media/logos/wasmfhe/logo_wasm_fhe.png" alt="Logo" width="auto" height="400">
  </a>

  <h3 align="center">FHE WASM</h3>

  <p align="center">
    A Fully Homomorphic Encryption WebAssembly module written in Rust based on a Rust library for lattice-based additive homomorphic encryption with Typescript bindings
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/mihailpreda/fhe-wasm-module/issues">Report Bug</a>
    ·
    <a href="https://github.com/mihailpreda/fhe-wasm-module/issues">Request Feature</a>
    ·
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

 <img src="media/logos/no_ads/no_ads_data_processing.png" alt="Logo" width="auto" >
The goal is to replace the current economic model of websites' monetization. Rather than showing paid ads, that confuse and annoy people, the websites could use some of the processing power of people's devices to make several computation on some chunks of data.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This implementation was possible with the help of certain languages, frameworks and libraries. The main used technologies are :

- [Vue.js](https://vuejs.org/)
- [Rust](https://www.rust-lang.org/)
- [WebAssembly](https://webassembly.org/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [Cupcake](https://github.com/facebookresearch/Cupcake)
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

In order to use you just need to [clone](https://github.com/mihailpreda/fhe-wasm-module.git) / [fork](https://github.com/mihailpreda/fhe-wasm-module.git) / [download](https://github.com/mihailpreda/fhe-wasm-module.git) this repository.

### Prerequisites

In order for the library to work you need the following:
_The library is tested on a Vue.js webapp which uses as framework quasar_

- npm
  ```sh
  npm install npm@latest -g
  ```
- quasar
  ```sh
  npm install -g @quasar/cli
  ```

### Installation

_This is a example of installation on a quasar project_

1. Create a quasar project
   ```sh
   quasar create <project_name>
   ```
2. Clone the repo
   ```sh
   git clone https://github.com/mihailpreda/fhe-wasm-module.git
   ```
3. Put into the project `src` folder , the `fhe` folder from repo

4. Add into `quasar.conf.js` in webpack configuration into the `build` property, the following: (immediate after _`chainWebpack(chain){...}`_ )
   ```js

      extendWebpack(cfg) {
        cfg.experiments = {
          asyncWebAssembly: true
        }
      },
   ```
   For better understanding, check this [quasar.conf.js sample](./media/code/quasar.conf.js)
5. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: media/badges/contributors.svg
[contributors-url]: https://github.com/mihailpreda/fhe-wasm-module/contributors
[issues-shield]: media/badges/issues.svg
[issues-url]: https://img.shields.io/github/issues/mihailpreda/fhe-wasm-module?style=for-the-badge
[forks-shield]: media/badges/forks.svg
[forks-url]: https://img.shields.io/github/forks/mihailpreda/fhe-wasm-module?style=for-the-badge
[stars-shield]: media/badges/stars.svg
[stars-url]: https://img.shields.io/github/stars/mihailpreda/fhe-wasm-module?style=for-the-badge
[license-shield]: media/badges/license.svg
[license-url]: https://img.shields.io/github/license/mihailpreda/fhe-wasm-module?style=for-the-badge
[linkedin-shield]: media/badges/linkedin.svg
[linkedin-url]: https://www.linkedin.com/in/mihail-irinel-preda-2327b8195
[product-screenshot]: images/screenshot.png
