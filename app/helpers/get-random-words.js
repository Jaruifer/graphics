import { helper } from '@ember/component/helper';
import faker from 'faker';

/**
 * Helper getRandomWords is a shared function that generate
 * random words by using faker library.
 *
 * This helper can be used by any other component/place.
 */
export default helper(function getRandomWords(params) {
    const [min, max] = params;
    const size = faker.random.number({ min, max });
    return faker.lorem.words(size);
});
