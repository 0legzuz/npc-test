const mockAPI = {
  getPeople: async (page = 1, pageSize = 10, filter) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const categories = [
      {
        id: "mainData",
        title: "Основные данные",
        fields: [
          {
            id: "name",
            label: "ФИО",
            type: "text",
          },
          {
            id: "birthDate",
            label: "Дата рождения",
            type: "text",
          },
          {
            id: "email",
            label: "E-mail",
            type: "text",
          },
          {
            id: "phone",
            label: "Телефон",
            type: "text",
          },
          {
            id: "city",
            label: "Город",
            type: "select",
            options: [
              "Москва",
              "Санкт-Петербург",
              "Екатеринбург",
              "Казань",
              "Новосибирск",
              "Нижний Новгород",
              "Челябинск",
              "Омск",
            ],
          },
          {
            id: "status",
            label: "Статус",
            type: "select",
            options: [
              "Активный",
              "Неактивный",
              "Ожидает подтверждения",
              "Заблокирован",
            ],
          },
        ],
      },
    ];
    const generateRandomName = () => {
      const names = [
        "Иван",
        "Петр",
        "Мария",
        "Анна",
        "Екатерина",
        "Алексей",
        "Сергей",
        "Ольга",
        "Наталья",
        "Дмитрий",
      ];
      const surnames = [
        "Иванов",
        "Петров",
        "Сидорова",
        "Смирнова",
        "Кузнецова",
        "Васильев",
        "Михайлов",
        "Новикова",
        "Морозова",
        "Соколов",
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomSurname =
        surnames[Math.floor(Math.random() * surnames.length)];
      return `${randomName} ${randomSurname}`;
    };
    const generateRandomDate = () => {
      const startDate = new Date(1950, 0, 1);
      const endDate = new Date(2005, 11, 31);
      return new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      ).toLocaleDateString();
    };
    const generateRandomCity = () => {
      const cities = [
        "Москва",
        "Санкт-Петербург",
        "Екатеринбург",
        "Казань",
        "Новосибирск",
        "Нижний Новгород",
        "Челябинск",
        "Омск",
      ];
      return cities[Math.floor(Math.random() * cities.length)];
    };

    const generateRandomStatus = () => {
      const status = [
        "Активный",
        "Неактивный",
        "Ожидает подтверждения",
        "Заблокирован",
      ];
      return status[Math.floor(Math.random() * status.length)];
    };
    const generateRandomData = (quantity) => {
      return Array.from({ length: quantity }, (_, i) => ({
        id: i + 1,
        name: generateRandomName(),
        birthDate: generateRandomDate(),
        email: `email${i + 1}@test.com`,
        phone: `+799911122${(i + 1).toString().padStart(2, "0")}`,
        city: generateRandomCity(),
        status: generateRandomStatus(),
        citizenship: "Россия",
        maritalStatus: "Женат/Замужем",
        educationData: [{ educationLevel: "Высшее" }],
      }));
    };

    const allPeople = generateRandomData(1000);
    let filteredPeople = allPeople;

    if (filter) {
      filteredPeople = allPeople.filter((person) => {
        const nameMatch = person.name
          .toLowerCase()
          .includes(filter.name?.toLowerCase() || "");
        const emailMatch = person.email
          .toLowerCase()
          .includes(filter.email?.toLowerCase() || "");
        const phoneMatch = person.phone.includes(filter.phone || "");
        const statusMatch =
          filter.status === "Все" || person.status === filter.status;
        const cityMatch = filter.city === "Все" || person.city === filter.city;
        const citizenshipMatch =
          filter.citizenship === "Все" ||
          person.citizenship === filter.citizenship;
        const birthDateMatch = person.birthDate.includes(
          filter.birthDate || ""
        );
        const educationLevelMatch =
          filter.educationLevel === "Все" ||
          person.educationData.some(
            (edu) => edu.educationLevel === filter.educationLevel
          );
        const maritalStatusMatch =
          filter.maritalStatus === "Все" ||
          person.maritalStatus === filter.maritalStatus;
        return (
          nameMatch &&
          emailMatch &&
          phoneMatch &&
          statusMatch &&
          cityMatch &&
          citizenshipMatch &&
          birthDateMatch &&
          educationLevelMatch &&
          maritalStatusMatch
        );
      });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPeople = filteredPeople.slice(startIndex, endIndex);
    return {
      categories,
      people: paginatedPeople,
      total: filteredPeople.length,
    };
  },
  getPerson: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const categories = [
      {
        id: "mainData",
        title: "Основные данные",
        fields: [
          {
            id: "name",
            label: "ФИО",
            type: "text",
          },
          {
            id: "birthDate",
            label: "Дата рождения",
            type: "text",
          },
          {
            id: "email",
            label: "E-mail",
            type: "text",
          },
          {
            id: "phone",
            label: "Телефон",
            type: "text",
          },
          {
            id: "city",
            label: "Город",
            type: "select",
            options: [
              "Москва",
              "Санкт-Петербург",
              "Екатеринбург",
              "Казань",
              "Новосибирск",
              "Нижний Новгород",
              "Челябинск",
              "Омск",
            ],
          },
          {
            id: "status",
            label: "Статус",
            type: "select",
            options: [
              "Активный",
              "Неактивный",
              "Ожидает подтверждения",
              "Заблокирован",
            ],
          },
        ],
      },
      {
        id: "contactInfo",
        title: "Контактная информация",
        fields: [
          {
            id: "additionalPhone",
            label: "Дополнительный телефон",
            type: "text",
          },
          {
            id: "mobilePhone",
            label: "Мобильный телефон",
            type: "text",
          },
          {
            id: "workPhone",
            label: "Рабочий телефон",
            type: "text",
          },
          {
            id: "address",
            label: "Адрес проживания",
            type: "text",
          },
          {
            id: "addressActual",
            label: "Фактический адрес",
            type: "text",
          },
          {
            id: "messengers",
            label: "Мессенджеры",
            type: "text",
          },
          {
            id: "socialLinks",
            label: "Ссылки на социальные сети",
            type: "text",
          },
          {
            id: "messengerLinks",
            label: "Мессенджеры (ссылками)",
            type: "text",
          },
        ],
      },
      {
        id: "passportData",
        title: "Паспортные данные",
        fields: [
          {
            id: "passport",
            label: "Номер паспорта",
            type: "text",
          },
          {
            id: "passportSeries",
            label: "Серия паспорта",
            type: "text",
          },
          {
            id: "passportDepartmentCode",
            label: "Код подразделения",
            type: "text",
          },
          {
            id: "passportIssueDate",
            label: "Дата выдачи паспорта",
            type: "text",
          },
          {
            id: "passportExpiryDate",
            label: "Срок действия паспорта",
            type: "text",
          },
        ],
      },
      {
        id: "additionalDocuments",
        title: "Дополнительные документы",
        fields: [
          {
            id: "inn",
            label: "ИНН",
            type: "text",
          },
          {
            id: "snils",
            label: "СНИЛС",
            type: "text",
          },
          {
            id: "driverLicenseNumber",
            label: "Номер водительского удостоверения",
            type: "text",
          },
          {
            id: "driverLicenseCategory",
            label: "Категория водительского удостоверения",
            type: "text",
          },
          {
            id: "internationalPassport",
            label: "Номер загранпаспорта",
            type: "text",
          },
          {
            id: "internationalPassportExpiryDate",
            label: "Срок действия загранпаспорта",
            type: "text",
          },
          {
            id: "birthCertificateNumber",
            label: "Номер свидетельства о рождении",
            type: "text",
          },
        ],
      },
      {
        id: "financialInfo",
        title: "Финансовая информация",
        fields: [
          {
            id: "incomeSources",
            label: "Источники дохода",
            type: "text",
          },
          {
            id: "salary",
            label: "Размер заработной платы",
            type: "text",
          },
          {
            id: "monthlyExpenses",
            label: "Сумма ежемесячных расходов",
            type: "text",
          },
          {
            id: "hasLoans",
            label: "Наличие кредитов",
            type: "checkbox",
          },
          {
            id: "hasProperty",
            label: "Наличие недвижимости",
            type: "checkbox",
          },
          {
            id: "carBrand",
            label: "Марка автомобиля",
            type: "text",
          },
          {
            id: "carModel",
            label: "Модель автомобиля",
            type: "text",
          },
        ],
      },
      {
        id: "otherInfo",
        title: "Другое",
        fields: [
          {
            id: "citizenship",
            label: "Гражданство",
            type: "select",
            options: [
              "Россия",
              "США",
              "Китай",
              "Германия",
              "Франция",
              "Великобритания",
              "Япония",
              "Индия",
            ],
          },
          {
            id: "nationality",
            label: "Национальность",
            type: "text",
          },
          {
            id: "religion",
            label: "Вероисповедание",
            type: "text",
          },
          {
            id: "maritalStatus",
            label: "Семейное положение",
            type: "select",
            options: [
              "Не женат/не замужем",
              "Женат/Замужем",
              "В разводе",
              "Вдовец/Вдова",
            ],
          },
          {
            id: "childrenCount",
            label: "Количество детей",
            type: "text",
          },
          {
            id: "hobbies",
            label: "Хобби и увлечения",
            type: "text",
          },
          {
            id: "additionalInfo",
            label: "Дополнительная информация",
            type: "text",
          },
          {
            id: "age",
            label: "Возраст",
            type: "text",
          },
          {
            id: "registrationNumber",
            label: "Регистрационный номер",
            type: "text",
          },
          {
            id: "drivingExperience",
            label: "Опыт вождения (лет)",
            type: "text",
          },
          {
            id: "postalCode",
            label: "Почтовый индекс",
            type: "text",
          },
        ],
      },
      {
        id: "family",
        title: "Семья",
        type: "list",
      },
      {
        id: "education",
        title: "Образование",
        type: "list",
      },
      {
        id: "workExperience",
        title: "Опыт работы",
        type: "list",
      },
    ];
    const generateRandomDate = () => {
      const startDate = new Date(1950, 0, 1);
      const endDate = new Date(2005, 11, 31);
      return new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      ).toLocaleDateString();
    };
    const generateRandomStatus = () => {
      const status = [
        "Активный",
        "Неактивный",
        "Ожидает подтверждения",
        "Заблокирован",
      ];
      return status[Math.floor(Math.random() * status.length)];
    };
    const generateRandomCity = () => {
      const cities = [
        "Москва",
        "Санкт-Петербург",
        "Екатеринбург",
        "Казань",
        "Новосибирск",
        "Нижний Новгород",
        "Челябинск",
        "Омск",
      ];
      return cities[Math.floor(Math.random() * cities.length)];
    };
    const generateRandomName = () => {
      const names = [
        "Иван",
        "Петр",
        "Мария",
        "Анна",
        "Екатерина",
        "Алексей",
        "Сергей",
        "Ольга",
        "Наталья",
        "Дмитрий",
      ];
      const surnames = [
        "Иванов",
        "Петров",
        "Сидорова",
        "Смирнова",
        "Кузнецова",
        "Васильев",
        "Михайлов",
        "Новикова",
        "Морозова",
        "Соколов",
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomSurname =
        surnames[Math.floor(Math.random() * surnames.length)];
      return `${randomName} ${randomSurname}`;
    };
    const generateRandomGender = () => {
      const genders = ["Мужской", "Женский"];
      return genders[Math.floor(Math.random() * genders.length)];
    };
    const generateRandomOccupation = () => {
      const occupations = [
        "Инженер",
        "Врач",
        "Учитель",
        "Менеджер",
        "Программист",
        "Экономист",
        "Юрист",
        "Дизайнер",
        "Маркетолог",
        "Бухгалтер",
      ];
      return occupations[Math.floor(Math.random() * occupations.length)];
    };
    const generateRandomEducationLevel = () => {
      const educationLevels = [
        "Высшее",
        "Среднее профессиональное",
        "Среднее",
        "Неоконченное высшее",
        "Начальное",
      ];
      return educationLevels[
        Math.floor(Math.random() * educationLevels.length)
      ];
    };
    const generateRandomBoolean = () => {
      return Math.random() < 0.5;
    };
    const generateRandomNumber = () => {
      return Math.floor(Math.random() * 100000);
    };
    const generateRandomIndustry = () => {
      const industries = [
        "IT",
        "Медицина",
        "Образование",
        "Финансы",
        "Строительство",
        "Транспорт",
        "Торговля",
        "Сельское хозяйство",
        "Туризм",
      ];
      return industries[Math.floor(Math.random() * industries.length)];
    };
    const generateRandomSocialLink = () => {
      const socialLinks = [
        "https://www.linkedin.com/",
        "https://www.facebook.com/",
        "https://www.instagram.com/",
        "https://twitter.com/",
        "https://vk.com/",
      ];
      return socialLinks[Math.floor(Math.random() * socialLinks.length)];
    };
    const generateRandomMessengerLink = () => {
      const messengersLinks = [
        "https://t.me/",
        "https://wa.me/",
        "viber://chat",
      ];
      return messengersLinks[
        Math.floor(Math.random() * messengersLinks.length)
      ];
    };
    const generateRandomString = () => {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const length = Math.floor(Math.random() * 10) + 5;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };
    return {
      categories,
      id: id,
      name: generateRandomName(),
      birthDate: generateRandomDate(),
      email: `email${id}@test.com`,
      phone: `+799911122${id.toString().padStart(2, "0")}`,
      city: generateRandomCity(),
      status: generateRandomStatus(),
      address: "Улица Пушкина, дом Колотушкина",
      addressActual: "Улица Лермонтова, дом 20",
      passport: "0000-111111",
      passportSeries: "0000",
      passportDepartmentCode: "111-111",
      passportIssueDate: generateRandomDate(),
      passportExpiryDate: generateRandomDate(),
      inn: "111111111111",
      snils: "111-111-111 11",
      birthCertificateNumber: generateRandomString(),
      citizenship: "Россия",
      birthPlace: "город Москва",
      mobilePhone: `+799933344${(id + 1).toString().padStart(2, "0")}`,
      workPhone: `+799955566${(id + 2).toString().padStart(2, "0")}`,
      messengers: "Telegram, WhatsApp, Viber",
      socialLinks: generateRandomSocialLink(),
      messengerLinks: generateRandomMessengerLink(),
      family: [
        {
          name: "Мать",
          fullName: generateRandomName(),
          birthDate: generateRandomDate(),
          gender: generateRandomGender(),
          occupation: generateRandomOccupation(),
        },
        {
          name: "Отец",
          fullName: generateRandomName(),
          birthDate: generateRandomDate(),
          gender: generateRandomGender(),
          occupation: generateRandomOccupation(),
        },
        {
          name: "Брат",
          fullName: generateRandomName(),
          birthDate: generateRandomDate(),
          gender: generateRandomGender(),
          occupation: generateRandomOccupation(),
        },
      ],
      education: [
        {
          university: "МГУ",
          year: 2015,
          speciality: "Программист",
          educationLevel: generateRandomEducationLevel(),
          startDate: generateRandomDate(),
          form: "Очная",
          additionalCourses: "Курсы повышения квалификации",
        },
        {
          university: "СПбГУ",
          year: 2020,
          speciality: "Экономист",
          educationLevel: generateRandomEducationLevel(),
          startDate: generateRandomDate(),
          form: "Заочная",
          additionalCourses: "Курсы по маркетингу",
        },
      ],
      workExperience: [
        {
          company: "Рога и копыта",
          position: "Менеджер",
          startDate: "01.01.2020",
          endDate: "01.01.2022",
          duties: "Контроль работы персонала",
          industry: generateRandomIndustry(),
        },
        {
          company: "ОАО Газпром",
          position: "Ведущий специалист",
          startDate: "01.02.2022",
          endDate: "Текущее время",
          duties: "Работа с поставщиками",
          industry: generateRandomIndustry(),
        },
      ],
      hasCar: generateRandomBoolean(),
      hasHouse: generateRandomBoolean(),
      hasCredit: generateRandomBoolean(),
      passportIssuedBy: "УВД города Москвы",
      driverLicenseNumber: "11AA223344",
      driverLicenseCategory: "B",
      internationalPassport: `77${generateRandomNumber()}`,
      internationalPassportExpiryDate: generateRandomDate(),
      maritalStatus: "Женат/Замужем",
      childrenCount: generateRandomNumber(),
      incomeSource: "Зарплата",
      incomeSources: "Зарплата, инвестиции",
      salary: generateRandomNumber(),
      hasLoans: generateRandomBoolean(),
      monthlyExpenses: generateRandomNumber(),
      hasProperty: generateRandomBoolean(),
      carBrand: "BMW",
      carModel: "X5",
      nationality: "Русский",
      religion: "Православие",
      hobbies: "Чтение, спорт",
      additionalInfo: "Нет судимостей",
      age: "25",
      registrationNumber: "111-222-333",
      drivingExperience: "5",
      postalCode: "123456",
    };
  },
  getDashboardData: async (period = "all", city = "all") => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const generateRandomStatus = () => {
      const status = [
        "Активный",
        "Неактивный",
        "Ожидает подтверждения",
        "Заблокирован",
      ];
      return status[Math.floor(Math.random() * status.length)];
    };
    const generateRandomDate = (startDate, endDate) => {
      return new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );
    };
    const generateRandomCity = () => {
      const cities = [
        "Москва",
        "Санкт-Петербург",
        "Екатеринбург",
        "Казань",
        "Новосибирск",
        "Нижний Новгород",
        "Челябинск",
        "Омск",
      ];
      return cities[Math.floor(Math.random() * cities.length)];
    };
    const generateRandomEducationLevel = () => {
      const educationLevels = [
        "Высшее",
        "Среднее профессиональное",
        "Среднее",
        "Неоконченное высшее",
        "Начальное",
      ];
      return educationLevels[
        Math.floor(Math.random() * educationLevels.length)
      ];
    };
    const generateRandomMaritalStatus = () => {
      const maritalStatus = [
        "Не женат/не замужем",
        "Женат/Замужем",
        "В разводе",
        "Вдовец/Вдова",
      ];
      return maritalStatus[Math.floor(Math.random() * maritalStatus.length)];
    };
    const generateRandomData = (quantity) => {
      const now = new Date();
      let startDate;

      if (period === "week") {
        startDate = new Date(now.setDate(now.getDate() - 7));
      } else if (period === "month") {
        startDate = new Date(now.setMonth(now.getMonth() - 1));
      } else if (period === "year") {
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      } else {
        startDate = new Date(2020, 0, 1);
      }

      return Array.from({ length: quantity }, (_, i) => ({
        id: i + 1,
        city: generateRandomCity(),
        status: generateRandomStatus(),
        registrationDate: generateRandomDate(startDate, new Date()),
        educationLevel: generateRandomEducationLevel(),
        maritalStatus: generateRandomMaritalStatus(),
      }));
    };
    const people = generateRandomData(1000);
    let filteredPeople = people;

    if (city !== "all") {
      filteredPeople = people.filter((person) => person.city === city);
    }
    const activeRecords = filteredPeople.filter(
      (person) => person.status === "Активный"
    ).length;
    const inactiveRecords = filteredPeople.filter(
      (person) => person.status === "Неактивный"
    ).length;
    const pieChartData = filteredPeople.reduce((acc, person) => {
      acc[person.city] = (acc[person.city] || 0) + 1;
      return acc;
    }, {});
    const formattedPieData = Object.entries(pieChartData).map(
      ([name, value]) => ({ name, value })
    );
    const activeUsersByTime = filteredPeople.reduce((acc, person) => {
      const date = person.registrationDate.toLocaleDateString();
      acc[date] = (acc[date] || 0) + (person.status === "Активный" ? 1 : 0);
      return acc;
    }, {});
    const formattedActiveUsersByTime = Object.entries(activeUsersByTime).map(
      ([name, value]) => ({ name, value })
    );
    const educationLevelData = filteredPeople.reduce((acc, person) => {
      acc[person.educationLevel] = (acc[person.educationLevel] || 0) + 1;
      return acc;
    }, {});
    const formattedEducationLevelData = Object.entries(educationLevelData).map(
      ([name, value]) => ({ name, value })
    );
    const maritalStatusData = filteredPeople.reduce((acc, person) => {
      acc[person.maritalStatus] = (acc[person.maritalStatus] || 0) + 1;
      return acc;
    }, {});
    const formattedMaritalStatusData = Object.entries(maritalStatusData).map(
      ([name, value]) => ({ name, value })
    );
    return {
      totalRecords: filteredPeople.length,
      activeRecords,
      inactiveRecords,
      pieChartData: formattedPieData,
      activeUsersByTime: formattedActiveUsersByTime,
      educationLevelData: formattedEducationLevelData,
      maritalStatusData: formattedMaritalStatusData,
    };
  },
};

export default mockAPI;
