import { Op } from 'sequelize';
import db from '../config/db/db.js';
import { DEFAULT_HEIGHTS } from '../config/const.js';

class TutorController  {
  constructor() {
    this.tutor = db.tutor;
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async list(request, response) {
    let content = { success: false };

    try {
      const tutor = await this.tutor.findAll();

      content = {
        success: true,
        data: tutor
      };
    } catch (error) {
      console.error(error);

      content = {
        success: false,
        error
      };
    } finally {
      return response.send(content);
    }
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async show(request, response) {
    let content = { success: false };

    try {
      const { params } = request;
      const { id } = params;

      if (!id) throw '[id] de filtro não enviado nos parâmetros da rota.';

      const tutorCadastrado = await this.tutor.findByPk(id);
      if (!tutorCadastrado) throw `Não existe um registro de Tutor com código [${id}].`;

      content = {
        success: true,
        result: tutorCadastrado
      };
    } catch (error) {
      console.error(error);

      content = {
        success: false,
        error
      };
    } finally {
      return response.send(content);
    }
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async create(request, response) {
    let content = { success: false };

    try {
      const { body } = request;

      let document = body.cpf;
      let name = body.nome;
      let mail = body.email;

      const tutor = await this.tutor.create({
        porte: description,
        cpf: document,
        nome: name,
        email: mail
      });

      content = {
        success: true,
        result: tutor
      };
    } catch (error) {
      console.error(error);

      content = {
        success: false,
        error
      };
    } finally {
      return response.send(content);
    }
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async update(request, response) {
    let content = { success: false };

    try {
      const { body, params } = request;
      const { id } = params;

      let document = body.cpf;
      let name = body.nome;
      let mail = body.email;

      if (!id) throw '[id] de filtro não enviado nos parâmetros da rota.';

      const tutorCadastrado = await this.tutor.findByPk(id);
      if (!tutorCadastrado) throw `Não existe um registro de tutor com código [${id}].`;

      tutorCadastrado.cpf = document;
      tutorCadastrado.nome = name;
      tutorCadastrado.email = mail;

      const tutor = await tutorCadastrado.save();

      content = {
        success: true,
        result: tutor
      };
    } catch (error) {
      console.error(error);

      content = {
        success: false,
        error
      };
    } finally {
      return response.send(content);
    }
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async delete(request, response) {
    let content = { success: false };

    try {
      const { params } = request;
      const { id } = params;

      if (!id) throw '[id] de filtro não enviado nos parâmetros da rota.';

      const tutorCadastrado = await this.tutor.findByPk(id);
      if (!tutorCadastrado) throw `Não existe um registro de Tutor com código [${id}].`;

      await tutorCadastrado.destroy();

      content = { success: true };
    } catch (error) {
      console.error(error);

      content = {
        success: false,
        error
      };
    } finally {
      return response.send(content);
    }
  }
}

export default TutorController;