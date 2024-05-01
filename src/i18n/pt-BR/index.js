export default {
  title: "Hope's Doces",
  menu: "Menu",
  settings: {
    title: 'Configurações',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    auto: 'Automático',
  },
  common: {
    table: {
      noData: 'Nenhum dado encontrado',
      noResults: 'Nenhum resultado encontrado',
      rowsPerPage: 'Itens por página',
      pagination: 'Página {page} de {pages}',
    },
    singular: {
      order: 'Pedido',
      client: 'Cliente',
    },
    plural: {
      order: 'Pedidos',
      client: 'Clientes',
    },
    fields: {
      name: 'Nome',
      email: 'E-mail',
      password: 'Senha',
      phone: 'Telefone',
      address: 'Endereço',
      notes: 'Observações',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },
    rules: {
      required: 'Campo obrigatório',
      email: 'E-mail inválido',
      password: 'Senha inválida',
      phone: 'Telefone inválido',
      address: 'Endereço inválido',
    },
    entity: {
      order: 'pedido',
      client: 'cliente',
    },
    buttons: {
      register: 'Registrar {entity}'
    },
    status: {
      pending: 'Pendente',
      preparing: 'Preparando',
      delivering: 'Entregando',
      delivered: 'Entregue',
      canceled: 'Cancelado',
    }
  }
}
