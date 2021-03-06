<?php

/**
 * @file
 * Contains the grid style plugin.
 */

/**
 * Style plugin to render each item in a grid cell.
 *
 * @ingroup views_style_plugins
 */
class aviators_map_plugin_style_gmap extends views_plugin_style {

  /**
   * Set default options
   */
  function option_definition() {
    $options = parent::option_definition();

    $options['class'] = array('default' => NULL);
    $options['class_field'] = array('default' => NULL);

    $options['map_field'] = array('default' => NULL);
    $options['hide_infobox'] = array('default' => FALSE);
    $options['disable_infobox'] = array('default' => FALSE);
    $options['content_insidemarker'] = array('default' => FALSE);
    $options['enable_cluster'] = array('default' => TRUE);
    $options['cluster_zoomonclick'] = array('default' => TRUE);
    $options['clustering_size'] = array('default' => 60);

    $options['zoom'] = array('default' => 12);
    $options['width'] = array('default' => '400px');
    $options['height'] = array('default' => '400px');

    $options['default_position'] = array('default' => 'default');
    $options['map_longitude'] = array('map_longitude' => '');
    $options['map_latitude'] = array('map_latitude' => '');

    $options['overview_map_control'] = array('default' => TRUE);
    $options['pan_control_position'] = array('default' => 1);
    $options['scale_control_position'] = array('default' => 1);
    $options['rotate_control_position'] = array('default' => 1);
    $options['zoom_control_position'] = array('default' => 1);
    $options['streetview_control_position'] = array('default' => 1);
    $options['map_style'] = array('default' => '');
    $options['custom_style'] = array('default' => FALSE);
    $options['draggable_disabled'] = array('default' => FALSE);

    return $options;
  }

  /**
   * Render the given style.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $field_names = $this->display->handler->get_field_labels();

    $form['zoom'] = array(
      '#title' => t('Zoom'),
      '#type' => 'select',
      '#options' => array(
        1 => 1,
        2 => 2,
        3 => 3,
        4 => 4,
        5 => 5,
        6 => 6,
        7 => 7,
        8 => 8,
        9 => 9,
        10 => 10,
        11 => 11,
        12 => 12,
        13 => 13,
        14 => 14,
        15 => 15,
        16 => 16,
        17 => 17,
      ),
      '#default_value' => $this->options['zoom']
    );

    $form['width'] = array(
      '#type' => 'textfield',
      '#title' => t('Width'),
      '#default_value' => $this->options['width']
    );

    $form['height'] = array(
      '#type' => 'textfield',
      '#title' => t('Height'),
      '#default_value' => $this->options['height']
    );

    $form['map_field'] = array(
      '#type' => 'select',
      '#title' => t('Google map field'),
      '#options' => $field_names,
      '#default_value' => $this->options['map_field']
    );
    
    $form['marker_link'] = array(
      '#type' => 'select',
      '#title' => t('Marker link'),
      '#options' => $field_names,
      '#default_value' => $this->options['marker_link']
    );

    $form['class'] = array(
      '#type' => 'textfield',
      '#title' => t('Additional marker class'),
      '#default_value' => $this->options['class'],
    );

    $form['class_field'] = array(
      '#type' => 'select',
      '#title' => t('Marker class from field'),
      '#description' => t('This field is very usefull when styling various icons for various marker types'),
      '#options' => $field_names,
      '#default_value' => $this->options['class_field']
    );

    $form['default_position'] = array(
      '#type' => 'select',
      '#title' => t('Default map position'),
      '#options' => array(
        'default' => t('Center on given coordinates'),
        'center' => t('Markers center'),
        'center zoom' => t('Center of all markers - zoomed out'),
      ),
      '#default_value' => $this->options['default_position'],
    );

    $form['map_latitude'] = array(
      '#type' => 'textfield',
      '#title' => t('Map center - latitude'),
      '#default_value' => $this->options['map_latitude'],
    );

    $form['map_longitude'] = array(
      '#type' => 'textfield',
      '#title' => t('Map center - longitude'),
      '#default_value' => $this->options['map_longitude'],
    );
    
    $form['hide_infobox'] = array(
      '#type' => 'checkbox',
      '#title' => t('Hide infobox'),
      '#default_value' => $this->options['hide_infobox'],
    );
    
    $form['disable_infobox'] = array(
      '#type' => 'checkbox',
      '#title' => t('Disable infobox'),
      '#default_value' => $this->options['disable_infobox'],
    );
    
    $form['content_insidemarker'] = array(
      '#type' => 'checkbox',
      '#title' => t('Show content inside marker'),
      '#default_value' => $this->options['content_insidemarker'],
    );
    
    $form['enable_cluster'] = array(
      '#type' => 'checkbox',
      '#title' => t('Enable clustering'),
      '#default_value' => $this->options['enable_cluster'],
    );
    
    $form['cluster_zoomonclick'] = array(
      '#type' => 'checkbox',
      '#title' => t('Clustering zoom on click'),
      '#default_value' => $this->options['cluster_zoomonclick'],
    );

    $form['clustering_size'] = array(
      '#type' => 'textfield',
      '#descriptiom' => t('Clustering grid size - area of cluster influence'),
      '#title' => t('Cluster grid size'),
      '#default_value' => $this->options['clustering_size'],
    );

    $form['overview_map_control'] = array(
      '#type' => 'checkbox',
      '#title' => t('Enable map controls'),
      '#default_value' => $this->options['overview_map_control'],
    );

    $controls_position_options = array(
      0 => t('Don\'t display'),
      1 => t('TL - Top left'),
      2 => t('TC - Top center'),
      3 => t('TR - Top right'),
      4 => t('LT - Left top'),
      5 => t('RT - Right top'),
      6 => t('LC - Left center'),
      7 => t('RC - Right center'),
      8 => t('LB - Left bottom'),
      9 => t('RB - Right bottom'),
      10 => t('BL - Bottom left'),
      11 => t('BC - Bottom center'),
      12 => t('BR - Bottom right'),
    );

    $form['pan_control_position'] = array(
      '#type' => 'select',
      '#title' => t('Pan controls position'),
      '#options' => $controls_position_options,
      '#default_value' => $this->options['pan_control_position']
    );


    $form['scale_control_position'] = array(
      '#type' => 'select',
      '#title' => t('Scale controls position'),
      '#options' => $controls_position_options,
      '#default_value' => $this->options['scale_control_position']
    );


    $form['rotate_control_position'] = array(
      '#type' => 'select',
      '#title' => t('Rotate controls position'),
      '#options' => $controls_position_options,
      '#default_value' => $this->options['rotate_control_position']
    );

    $form['zoom_control_position'] = array(
      '#type' => 'select',
      '#title' => t('Zoom controls position'),
      '#options' => $controls_position_options,
      '#default_value' => $this->options['zoom_control_position']
    );

    $form['streetview_control_position'] = array(
      '#type' => 'select',
      '#title' => t('StreetView controls position'),
      '#options' => $controls_position_options,
      '#default_value' => $this->options['streetview_control_position']
    );
    
    $form['draggable_disabled'] = array(
      '#type' => 'checkbox',
      '#title' => t('Disable Dragging'),
      '#default_value' => $this->options['draggable_disabled'],
    );
    
    $form['custom_style'] = array(
      '#type' => 'checkbox',
      '#title' => t('Enable custom style'),
      '#default_value' => $this->options['custom_style'],
    );
    
    $form['map_style'] = array(
      '#type' => 'textarea',
      '#title' => t('Style for map'),
      '#default_value' => $this->options['map_style']
    );

    $form['control_position_desc']['#markup'] = "
    <pre>
    +________________+
    + TL    TC    TR +
    + LT          RT +
    +                +
    + LC          RC +
    +                +
    + LB          RB +
    + BL    BC    BR +
    +________________+
    </pre>
    ";
  }
}
