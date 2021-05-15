import React from 'react';
import { Collapse, List, Tag } from 'antd';
import styles from './index.less';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

const { Panel } = Collapse;
const { CheckableTag } = Tag;

class Archive extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTags: [],
      // selectedTag: '',
    };
  }

  handleChange(tag, checked) {
    const { handleTagChange = () => {} } = this.props;
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
    // invoke props
    handleTagChange(nextSelectedTags);
  }

  handleClickTag(tag) {
    const { handleTagChange = () => {} } = this.props;
    const nextSelectedTag = tag;
    this.setState({ selectedTag: nextSelectedTag });
    handleTagChange(nextSelectedTag);
  }

  render() {
    const { timeLine = {}, tags = {} } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.timeLine}>
          <div className={styles.title}>时间轴</div>
          <div className={styles.content} >
            <Collapse accordion >
              {Object.keys(timeLine).map(time => {
                return (
                  <Panel header={`${time}(${timeLine[time].total})`} key={time}>
                    <List
                      header={null}
                      footer={null}
                      bordered={null}
                      dataSource={timeLine[time].item}
                      renderItem={title => (
                        <List.Item key={title.id}>
                          <a href={`${window.location.href}${title.number}`}>{title.title}</a>
                        </List.Item>
                      )}
                    />
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </div>

        <div className={styles.label}>
          <div className={styles.title}>标签</div>
          <div className={styles.labels}>
            {tags &&
              Object.keys(tags).map(tag => {
                return (
                  // 单选
                  // <Tag
                  //   key={tag}
                  //   onClick={() => this.handleClickTag(tag)}
                  //   style={{ background: `#${tags[tag].color}`, color: '#fff', cursor: 'pointer' }}
                  // >{`${tags[tag].name}(${tags[tag].total})`}</Tag>
                  // 多选
                  <CheckableTag
                    key={tag}
                    checked={this.state.selectedTags.indexOf(tag) > -1}
                    onChange={checked => this.handleChange(tag, checked)}
                    style={{ cursor: 'pointer' }}
                  >{`${tags[tag].name}(${tags[tag].total})`}</CheckableTag>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Archive;
