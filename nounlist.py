with open('nounlist.txt', 'r') as f:
    for line in f:
        noun = f.readline()
        with open('options.js', 'a') as s:
            s.write("{value: '" + noun.strip() + "', label:'"+ noun.strip() + "'},")