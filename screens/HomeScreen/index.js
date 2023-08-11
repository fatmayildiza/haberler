import React, { Component } from 'react';
import { Text, View, Image, ScrollView, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import Header from '../../components/AppBar';

export default class HomeScreen extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
  };

  getArticles() {
    axios
      .get(
        'https://newsapi.org/v2/everything?q=apple&from=2023-08-10&to=2023-08-10&sortBy=popularity&apiKey=ca6b6e4d0206403b9181910d28cefb8b'
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          date: article.publishedAt,
          title: article.title,
          url: article.url,
          description: article.description,
          urlToImage: article.urlToImage,
        }))
      )
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    return (
      <View style= {{flex:1}}>
        <Header />
        <ScrollView>
          {!isLoading ? (
            articles.map((article) => {
              const { date, title, url, urlToImage, description } = article;
              return (
                <Card
                  key={url}
                  style={{
                    marginTop: 40,
                    borderColor: 'black',
                    borderRadius: 5,
                    borderBottomWidth: 2,
                  }}
                  onPress={() => {
                    Linking.openURL(url);
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    {/* text */}
                    <View
                      style={{
                        justifyContent: 'space-around',
                        flex: 2 / 3,
                        margin: 10,
                      }}
                    >
                      <Title style={{color:'#5B9A8B'}}>{title}</Title>
                    </View>

                    {/* image */}
                    <View style={{ flex: 1 / 3, margin: 10 }}>
                      <Image
                        style={{ width: 120, height: 120 }}
                        source={{ uri: urlToImage }}
                      />
                    </View>
                  </View>
                  <View style={{ margin: 10 }}>
                    <Paragraph style={{color:'#241468'}}>{description}</Paragraph>
                    <Text >Published At: {date}</Text>
                  </View>
                </Card>
              );
            })
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}
